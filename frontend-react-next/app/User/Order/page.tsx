"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../design-system';
import TrackOrder from './TrackOrder';
import NewOrderStats from './NewOrderStats';
import OrdersTable from './OrdersTable';
import type { Order, OrderStats } from './types';

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate server-side data fetching
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const ordersData: Order[] = [
        {
          id: 'ORD-001',
          patientName: 'Ahmed Hassan',
          orderType: 'Crown',
          status: 'Completed',
          date: '2024-01-15',
          totalAmount: 2500,
          urgency: 'Medium',
          material: 'Zirconia',
          notes: 'Upper left molar, color A2'
        },
        {
          id: 'ORD-002',
          patientName: 'Fatima Ali',
          orderType: 'Bridge',
          status: 'In Progress',
          date: '2024-01-16',
          totalAmount: 4200,
          urgency: 'High',
          material: 'PFM',
          notes: '3-unit bridge, front teeth'
        },
        {
          id: 'ORD-003',
          patientName: 'Mohamed Khaled',
          orderType: 'Implant',
          status: 'Pending',
          date: '2024-01-17',
          totalAmount: 3500,
          urgency: 'Low',
          material: 'Titanium',
          notes: 'Lower right premolar'
        },
        {
          id: 'ORD-004',
          patientName: 'Sara Mahmoud',
          orderType: 'Denture',
          status: 'Completed',
          date: '2024-01-18',
          totalAmount: 1800,
          urgency: 'Medium',
          material: 'Acrylic',
          notes: 'Complete upper denture'
        },
        {
          id: 'ORD-005',
          patientName: 'Omar Ahmed',
          orderType: 'Crown',
          status: 'In Progress',
          date: '2024-01-19',
          totalAmount: 2200,
          urgency: 'High',
          material: 'E-max',
          notes: 'Lower left canine'
        },
        {
          id: 'ORD-006',
          patientName: 'Layla Mohamed',
          orderType: 'Bridge',
          status: 'Pending',
          date: '2024-01-20',
          totalAmount: 3800,
          urgency: 'Medium',
          material: 'Zirconia',
          notes: '4-unit posterior bridge'
        },
        {
          id: 'ORD-007',
          patientName: 'Youssef Ibrahim',
          orderType: 'Implant',
          status: 'In Progress',
          date: '2024-01-21',
          totalAmount: 5500,
          urgency: 'High',
          material: 'Titanium',
          notes: 'Immediate loading implant'
        }
      ];

      const statsData: OrderStats = {
        total: ordersData.length,
        pending: ordersData.filter(o => o.status === 'Pending').length,
        inProgress: ordersData.filter(o => o.status === 'In Progress').length,
        completed: ordersData.filter(o => o.status === 'Completed').length,
        totalRevenue: ordersData.reduce((sum, order) => sum + order.totalAmount, 0)
      };

      setOrders(ordersData);
      setStats(statsData);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-xl font-bold text-slate-600">Loading...</div>
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
          Welcome Doctor
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
}

export default OrdersPage;