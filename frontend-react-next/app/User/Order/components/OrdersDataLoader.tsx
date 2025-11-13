"use client";

import { useState, useEffect } from 'react';
import type { Order, OrderStats } from '../types';

interface OrdersDataLoaderProps {
  children: (data: { orders: Order[]; stats: OrderStats; loading: boolean }) => React.ReactNode;
}

const OrdersDataLoader: React.FC<OrdersDataLoaderProps> = ({ children }) => {
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

  return children({ orders, stats, loading });
};

export default OrdersDataLoader;