import Swal from "sweetalert2";
import { useEffect } from "react";

export function useNavigationGuard(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    // حماية الـ refresh أو close
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // حماية الـ back button
    const handlePopState = async (e: PopStateEvent) => {
      e.preventDefault();

      const result = await Swal.fire({
        title: "Do you want to leave?",
        text: "The order will be canceled if you leave this page!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, leave",
        cancelButtonText: "No, stay here",
      });

      if (!result.isConfirmed) {
        // إعادة نفس الحالة في التاريخ حتى يظل المستخدم هنا
        history.pushState(null, "", window.location.href);
      }
    };

    // push initial state to avoid immediate back
    history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled]);
}
