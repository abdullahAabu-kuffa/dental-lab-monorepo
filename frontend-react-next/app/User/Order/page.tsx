"use client";

import { motion } from 'framer-motion';
import { motionVariants } from '../../design-system';
import { OrdersDataLoader } from './components';
import TrackOrder from './/components/TrackOrder';
import NewOrderStats from './components/NewOrderStats';
import OrdersTable from './components/OrdersTable';

function OrdersPage() {
  return (
    <OrdersDataLoader>
      {({ orders, stats, loading }) => {
        if (loading) {
          return (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          );
        }

        return (
          <div className="min-h-screen bg-gray-50 p-4 pr-12">
            <motion.div
              variants={motionVariants.fadeIn(0.3)}
              initial="initial"
              animate="animate"
              className="ml-4 mb-5"
            >
              <h1 className="text-3xl font-bold text-slate-800">
                My order
              </h1>
            </motion.div>

            <div className="flex justify-between items-stretch px-4 mb-10 ml-4 mr-4">
              <div className="w-[45%]">
                <NewOrderStats stats={stats} />
              </div>

              <div className="w-[45%]">
                <TrackOrder stats={stats} />
              </div>
            </div>

            <div className="flex justify-start px-4 ml-4">
              <div className="w-[45%]">
                <motion.div
                  variants={motionVariants.fadeIn(0.5)}
                  initial="initial"
                  animate="animate"
                >
                  <div className="bg-white rounded-lg">
                    <OrdersTable orders={orders} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      }}
    </OrdersDataLoader>
  );
}

export default OrdersPage;