import Swal from "sweetalert2";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function useNavigationGuard(enabled: boolean) {
  const allowExitRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;

    // Push a fake state so back button triggers popstate
    history.pushState(null, "", location.href);

    const onPopState = () => {
      if (allowExitRef.current) return;

      // Cancel actual back
      history.pushState(null, "", location.href);

      Swal.fire({
        title: "Do you want to leave?",
        text: "The order will be canceled if you leave this page!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, leave",
        cancelButtonText: "No, stay here",
      }).then((result) => {
        if (result.isConfirmed) {
          allowExitRef.current = true;
          window.onbeforeunload = null;
          router.push("/User/Order");
        }
      });
    };

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!allowExitRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [enabled, router]);
}
