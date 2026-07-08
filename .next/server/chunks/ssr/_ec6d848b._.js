module.exports = {

"[project]/lib/mock-data.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "missionStatusCounts": (()=>missionStatusCounts),
    "mockAgency": (()=>mockAgency),
    "mockBillingPolicies": (()=>mockBillingPolicies),
    "mockBranches": (()=>mockBranches),
    "mockCommissions": (()=>mockCommissions),
    "mockContracts": (()=>mockContracts),
    "mockDeliverers": (()=>mockDeliverers),
    "mockFreelancers": (()=>mockFreelancers),
    "mockHubParcels": (()=>mockHubParcels),
    "mockHubs": (()=>mockHubs),
    "mockMissions": (()=>mockMissions),
    "mockStaffMembers": (()=>mockStaffMembers),
    "mockVehicles": (()=>mockVehicles)
});
const mockAgency = {
    id: 'AGN-001',
    name: 'Rapid Express Douala',
    legalName: 'Rapid Express SARL',
    registrationNumber: 'RC/DLA/2021/B/1234',
    type: 'ENTERPRISE',
    status: 'ACTIVE',
    phone: '+237 233 42 18 90',
    email: 'contact@rapidexpress-dla.cm',
    address: '3 Rue Joss, Akwa',
    city: 'Douala',
    country: 'Cameroun',
    createdAt: '2021-03-15',
    defaultCurrency: 'XAF',
    autoAssignMissions: true,
    maxAssociatedFreelancers: 20,
    hubRetentionDelayHours: 72,
    allowFreelancerAssociation: true
};
const mockBranches = [
    {
        id: 'BRN-001',
        agencyId: 'AGN-001',
        name: 'Antenne Akwa (Siège)',
        address: '3 Rue Joss, Akwa',
        city: 'Douala',
        isHeadquarters: true,
        managerId: 'MGR-001',
        managerName: 'Étienne Nlend',
        managerEmail: 'e.nlend@rapidexpress.cm',
        managerPhone: '+237 699 00 11 22',
        status: 'OPEN',
        openingHours: 'Lun–Sam 07h00–20h00',
        deliverersCount: 5,
        createdAt: '2021-03-15'
    },
    {
        id: 'BRN-002',
        agencyId: 'AGN-001',
        name: 'Antenne Bonapriso',
        address: 'Av. Général de Gaulle, Bonapriso',
        city: 'Douala',
        isHeadquarters: false,
        managerId: 'MGR-002',
        managerName: 'Mireille Atangana',
        managerEmail: 'm.atangana@rapidexpress.cm',
        managerPhone: '+237 677 34 56 78',
        status: 'OPEN',
        openingHours: 'Lun–Ven 08h00–19h00',
        deliverersCount: 3,
        createdAt: '2021-07-01'
    },
    {
        id: 'BRN-003',
        agencyId: 'AGN-001',
        name: 'Antenne Makepe',
        address: 'Quartier Makepe Missoke, Carrefour Elf',
        city: 'Douala',
        isHeadquarters: false,
        managerId: 'MGR-003',
        managerName: 'Rodrigue Kouam',
        managerEmail: 'r.kouam@rapidexpress.cm',
        managerPhone: '+237 691 78 90 12',
        status: 'OPEN',
        openingHours: 'Lun–Sam 07h30–18h30',
        deliverersCount: 2,
        createdAt: '2022-02-10'
    },
    {
        id: 'BRN-004',
        agencyId: 'AGN-001',
        name: 'Antenne Yassa',
        address: 'Zone Industrielle Yassa, Bloc D',
        city: 'Douala',
        isHeadquarters: false,
        status: 'TEMPORARILY_CLOSED',
        openingHours: 'Lun–Ven 08h00–17h00',
        deliverersCount: 0,
        createdAt: '2023-05-20'
    }
];
const mockStaffMembers = [
    {
        id: 'MGR-000',
        agencyId: 'AGN-001',
        fullName: 'Claude Mvogo',
        phone: '+237 699 12 34 56',
        email: 'c.mvogo@rapidexpress.cm',
        role: 'AGENCY_MANAGER',
        status: 'ACTIVE',
        joinedAt: '2021-03-15',
        photoUrl: 'https://i.pravatar.cc/150?u=c.mvogo@rapidexpress.cm'
    },
    {
        id: 'MGR-001',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        fullName: 'Étienne Nlend',
        phone: '+237 699 00 11 22',
        email: 'e.nlend@rapidexpress.cm',
        role: 'BRANCH_MANAGER',
        status: 'ACTIVE',
        joinedAt: '2021-03-15',
        photoUrl: 'https://i.pravatar.cc/150?u=e.nlend@rapidexpress.cm'
    },
    {
        id: 'MGR-002',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Antenne Bonapriso',
        fullName: 'Mireille Atangana',
        phone: '+237 677 34 56 78',
        email: 'm.atangana@rapidexpress.cm',
        role: 'BRANCH_MANAGER',
        status: 'ACTIVE',
        joinedAt: '2021-07-01',
        photoUrl: 'https://i.pravatar.cc/150?u=m.atangana@rapidexpress.cm'
    },
    {
        id: 'MGR-003',
        agencyId: 'AGN-001',
        branchId: 'BRN-003',
        branchName: 'Antenne Makepe',
        fullName: 'Rodrigue Kouam',
        phone: '+237 691 78 90 12',
        email: 'r.kouam@rapidexpress.cm',
        role: 'BRANCH_MANAGER',
        status: 'ACTIVE',
        joinedAt: '2022-02-10',
        photoUrl: 'https://i.pravatar.cc/150?u=r.kouam@rapidexpress.cm'
    }
];
const mockDeliverers = [
    {
        id: 'DLV-001',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        fullName: 'Jean-Paul Essomba',
        phone: '+237 691 23 45 67',
        email: 'jp.essomba@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'AVAILABLE',
        rating: 4.8,
        totalMissions: 234,
        vehicleId: 'VEH-001',
        vehiclePlate: 'LT-4521-A',
        joinedAt: '2021-03-20',
        photoUrl: 'https://i.pravatar.cc/150?u=jp.essomba@rapidexpress.cm'
    },
    {
        id: 'DLV-002',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        fullName: 'Martin Mbarga',
        phone: '+237 677 89 01 23',
        email: 'm.mbarga@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'ON_MISSION',
        rating: 4.6,
        totalMissions: 189,
        activeMissionId: 'MSN-005',
        vehicleId: 'VEH-002',
        vehiclePlate: 'LT-8832-B',
        joinedAt: '2021-05-10',
        photoUrl: 'https://i.pravatar.cc/150?u=m.mbarga@rapidexpress.cm'
    },
    {
        id: 'DLV-003',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Antenne Bonapriso',
        fullName: 'Mireille Atangana',
        phone: '+237 655 34 56 78',
        email: 'm.atangana@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'AVAILABLE',
        rating: 4.9,
        totalMissions: 312,
        vehicleId: 'VEH-004',
        vehiclePlate: 'LT-2210-C',
        joinedAt: '2021-07-01',
        photoUrl: 'https://i.pravatar.cc/150?u=m.atangana@rapidexpress.cm'
    },
    {
        id: 'DLV-004',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        fullName: 'Rodrigue Nkomo',
        phone: '+237 699 56 78 90',
        email: 'r.nkomo@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'OFFLINE',
        rating: 4.3,
        totalMissions: 156,
        joinedAt: '2021-09-15',
        photoUrl: 'https://i.pravatar.cc/150?u=r.nkomo@rapidexpress.cm'
    },
    {
        id: 'DLV-005',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Antenne Bonapriso',
        fullName: 'Carine Beyene',
        phone: '+237 670 12 34 56',
        email: 'c.beyene@rapidexpress.cm',
        type: 'PART_TIME',
        status: 'AVAILABLE',
        rating: 4.7,
        totalMissions: 98,
        vehicleId: 'VEH-005',
        vehiclePlate: 'LT-6643-D',
        joinedAt: '2022-01-08',
        photoUrl: 'https://i.pravatar.cc/150?u=c.beyene@rapidexpress.cm'
    },
    {
        id: 'DLV-006',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        fullName: 'Patrick Abessolo',
        phone: '+237 694 78 90 12',
        email: 'p.abessolo@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'SUSPENDED',
        rating: 3.8,
        totalMissions: 67,
        joinedAt: '2022-04-20'
    },
    {
        id: 'DLV-007',
        agencyId: 'AGN-001',
        branchId: 'BRN-003',
        branchName: 'Antenne Makepe',
        fullName: 'Alice Manga',
        phone: '+237 681 90 12 34',
        email: 'a.manga@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'ON_MISSION',
        rating: 4.5,
        totalMissions: 145,
        activeMissionId: 'MSN-008',
        vehicleId: 'VEH-007',
        vehiclePlate: 'LT-9901-E',
        joinedAt: '2022-02-10',
        photoUrl: 'https://i.pravatar.cc/150?u=a.manga@rapidexpress.cm'
    },
    {
        id: 'DLV-008',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Antenne Bonapriso',
        fullName: 'Thierry Ngatcha',
        phone: '+237 675 23 45 67',
        email: 't.ngatcha@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'AVAILABLE',
        rating: 4.4,
        totalMissions: 201,
        vehicleId: 'VEH-008',
        vehiclePlate: 'LT-3317-F',
        joinedAt: '2022-06-01',
        photoUrl: 'https://i.pravatar.cc/150?u=t.ngatcha@rapidexpress.cm'
    }
];
const mockFreelancers = [
    {
        id: 'ASC-001',
        agencyId: 'AGN-001',
        freelancerId: 'FL-001',
        freelancerName: 'Duplex Fotso',
        phone: '+237 690 11 22 33',
        commissionRate: 12,
        assignedMissionsCount: 12,
        status: 'ACTIVE',
        associatedAt: '2026-02-15'
    },
    {
        id: 'ASC-002',
        agencyId: 'AGN-001',
        freelancerId: 'FL-002',
        freelancerName: 'Ange Kamga',
        phone: '+237 674 44 55 66',
        commissionRate: 10,
        assignedMissionsCount: 8,
        status: 'ACTIVE',
        associatedAt: '2026-03-01'
    },
    {
        id: 'ASC-003',
        agencyId: 'AGN-001',
        freelancerId: 'FL-003',
        freelancerName: 'Serge Eba',
        phone: '+237 698 77 88 99',
        commissionRate: 11,
        assignedMissionsCount: 0,
        status: 'PENDING',
        associatedAt: '2026-04-20'
    },
    {
        id: 'ASC-004',
        agencyId: 'AGN-001',
        freelancerId: 'FL-004',
        freelancerName: 'Brice Moundi',
        phone: '+237 650 00 11 22',
        commissionRate: 10,
        assignedMissionsCount: 23,
        status: 'TERMINATED',
        associatedAt: '2025-10-01',
        endedAt: '2026-01-31'
    }
];
const mockContracts = [
    {
        id: 'CTR-001',
        agencyId: 'AGN-001',
        delivererId: 'DLV-001',
        delivererName: 'Jean-Paul Essomba',
        type: 'PERMANENT_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2021-03-20',
        remunerationType: 'MONTHLY_SALARY',
        rate: 120000,
        currency: 'XAF'
    },
    {
        id: 'CTR-002',
        agencyId: 'AGN-001',
        delivererId: 'DLV-002',
        delivererName: 'Martin Mbarga',
        type: 'PERMANENT_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2021-05-10',
        remunerationType: 'MONTHLY_SALARY',
        rate: 115000,
        currency: 'XAF'
    },
    {
        id: 'CTR-003',
        agencyId: 'AGN-001',
        delivererId: 'DLV-003',
        delivererName: 'Mireille Atangana',
        type: 'PERMANENT_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2021-07-01',
        remunerationType: 'MIXED_SALARY_BONUS',
        rate: 130000,
        currency: 'XAF'
    },
    {
        id: 'CTR-004',
        agencyId: 'AGN-001',
        delivererId: 'DLV-005',
        delivererName: 'Carine Beyene',
        type: 'PART_TIME_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2022-01-08',
        endDate: '2026-12-31',
        remunerationType: 'FIXED_PER_DELIVERY',
        rate: 800,
        currency: 'XAF'
    },
    {
        id: 'CTR-005',
        agencyId: 'AGN-001',
        delivererId: 'DLV-006',
        delivererName: 'Patrick Abessolo',
        type: 'PERMANENT_EMPLOYEE',
        status: 'TERMINATED',
        startDate: '2022-04-20',
        endDate: '2026-03-15',
        remunerationType: 'MONTHLY_SALARY',
        rate: 100000,
        currency: 'XAF'
    },
    {
        id: 'CTR-006',
        agencyId: 'AGN-001',
        delivererId: 'DLV-007',
        delivererName: 'Alice Manga',
        type: 'PERMANENT_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2022-02-10',
        remunerationType: 'MIXED_SALARY_BONUS',
        rate: 118000,
        currency: 'XAF'
    },
    {
        id: 'CTR-007',
        agencyId: 'AGN-001',
        delivererId: 'DLV-008',
        delivererName: 'Thierry Ngatcha',
        type: 'PERMANENT_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2022-06-01',
        remunerationType: 'MONTHLY_SALARY',
        rate: 112000,
        currency: 'XAF'
    }
];
const mockVehicles = [
    {
        id: 'VEH-001',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-4521-A',
        model: 'Yamaha FZ25',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-001',
        assignedDelivererName: 'Jean-Paul Essomba',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-02-10'
    },
    {
        id: 'VEH-002',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-8832-B',
        model: 'Honda CB125F',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-002',
        assignedDelivererName: 'Martin Mbarga',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-01-22'
    },
    {
        id: 'VEH-003',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-1145-C',
        model: 'Lifan KP150',
        type: 'MOTORCYCLE',
        status: 'AVAILABLE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-03-05'
    },
    {
        id: 'VEH-004',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-2210-C',
        model: 'Suzuki GN125',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-003',
        assignedDelivererName: 'Mireille Atangana',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        lastMaintenanceDate: '2026-02-28'
    },
    {
        id: 'VEH-005',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-6643-D',
        model: 'Bajaj Boxer',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-005',
        assignedDelivererName: 'Carine Beyene',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        lastMaintenanceDate: '2026-03-18'
    },
    {
        id: 'VEH-006',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-3390-E',
        model: 'Yamaha Crypton',
        type: 'MOTORCYCLE',
        status: 'IN_MAINTENANCE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        lastMaintenanceDate: '2026-04-15'
    },
    {
        id: 'VEH-007',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-9901-E',
        model: 'Honda Wave',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-007',
        assignedDelivererName: 'Alice Manga',
        branchId: 'BRN-003',
        branchName: 'Makepe',
        lastMaintenanceDate: '2026-01-30'
    },
    {
        id: 'VEH-008',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-3317-F',
        model: 'Yamaha FZ-S',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-008',
        assignedDelivererName: 'Thierry Ngatcha',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        lastMaintenanceDate: '2026-03-01'
    },
    {
        id: 'VEH-009',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-7712-G',
        model: 'Suzuki Every',
        type: 'CAR',
        status: 'AVAILABLE',
        maxWeightKg: 500,
        maxVolumeM3: 3.5,
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-02-20'
    },
    {
        id: 'VEH-010',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-5540-H',
        model: 'Toyota HiAce',
        type: 'CAR',
        status: 'AVAILABLE',
        maxWeightKg: 800,
        maxVolumeM3: 5.0,
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-04-01'
    },
    {
        id: 'VEH-011',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-4429-I',
        model: 'Mitsubishi L300',
        type: 'CAR',
        status: 'IN_MAINTENANCE',
        maxWeightKg: 700,
        maxVolumeM3: 4.2,
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        lastMaintenanceDate: '2026-04-22'
    },
    {
        id: 'VEH-012',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-8801-J',
        model: 'Isuzu NPR',
        type: 'TRUCK_LIGHT',
        status: 'AVAILABLE',
        maxWeightKg: 3000,
        maxVolumeM3: 20.0,
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-01-15'
    },
    {
        id: 'VEH-013',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-2270-K',
        model: 'Isuzu ELF',
        type: 'TRUCK_LIGHT',
        status: 'AVAILABLE',
        maxWeightKg: 2500,
        maxVolumeM3: 18.0,
        branchId: 'BRN-003',
        branchName: 'Makepe',
        lastMaintenanceDate: '2026-03-25'
    },
    {
        id: 'VEH-014',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-0033-L',
        model: 'Yamaha NMAX',
        type: 'MOTORCYCLE',
        status: 'AVAILABLE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        branchId: 'BRN-003',
        branchName: 'Makepe'
    },
    {
        id: 'VEH-015',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-5591-M',
        model: 'TVS Apache',
        type: 'MOTORCYCLE',
        status: 'RETIRED',
        maxWeightKg: 40,
        maxVolumeM3: 0.25,
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2025-11-30'
    }
];
const mockMissions = [
    {
        id: 'MSN-001',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0441',
        delivererId: 'DLV-001',
        delivererName: 'Jean-Paul Essomba',
        vehiclePlate: 'LT-4521-A',
        status: 'DELIVERED',
        priority: 'HIGH',
        senderName: 'CFAO Motors',
        recipientName: 'Bertrand Eloundou',
        recipientPhone: '+237 699 00 11 22',
        pickupAddress: 'Rue Drouot, Akwa',
        deliveryAddress: 'Cité SIC, Bépanda',
        scheduledPickupAt: '2026-04-28T08:00',
        scheduledDeliveryAt: '2026-04-28T10:00',
        actualPickupAt: '2026-04-28T08:12',
        actualDeliveryAt: '2026-04-28T09:47',
        packagesCount: 2,
        totalWeightKg: 4.5,
        sellingPrice: 3500,
        currency: 'XAF',
        createdAt: '2026-04-28T07:30'
    },
    {
        id: 'MSN-002',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        manifestNumber: 'MAN-2026-0440',
        delivererId: 'DLV-003',
        delivererName: 'Mireille Atangana',
        vehiclePlate: 'LT-2210-C',
        status: 'DELIVERED',
        priority: 'NORMAL',
        senderName: 'Orange Cameroun',
        recipientName: 'Nadine Fouda',
        recipientPhone: '+237 670 22 33 44',
        pickupAddress: 'Bd de la Liberté, Bonapriso',
        deliveryAddress: 'Quartier Ange Raphaël',
        scheduledPickupAt: '2026-04-28T09:00',
        scheduledDeliveryAt: '2026-04-28T11:30',
        actualPickupAt: '2026-04-28T09:05',
        actualDeliveryAt: '2026-04-28T11:10',
        packagesCount: 1,
        totalWeightKg: 1.2,
        sellingPrice: 2000,
        currency: 'XAF',
        createdAt: '2026-04-28T08:00'
    },
    {
        id: 'MSN-003',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0439',
        status: 'PENDING',
        priority: 'URGENT',
        senderName: 'Pharmacie Centrale',
        recipientName: 'Dr. Sylvain Kouam',
        recipientPhone: '+237 655 44 55 66',
        pickupAddress: 'Rue Joss, Akwa',
        deliveryAddress: 'Hôpital Général de Douala',
        scheduledPickupAt: '2026-04-28T14:00',
        scheduledDeliveryAt: '2026-04-28T15:00',
        packagesCount: 1,
        totalWeightKg: 0.8,
        sellingPrice: 5000,
        currency: 'XAF',
        createdAt: '2026-04-28T13:00'
    },
    {
        id: 'MSN-004',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0438',
        status: 'ASSIGNED',
        priority: 'NORMAL',
        delivererId: 'DLV-008',
        delivererName: 'Thierry Ngatcha',
        vehiclePlate: 'LT-3317-F',
        senderName: 'SOCAM',
        recipientName: 'Rachel Ngo',
        recipientPhone: '+237 694 66 77 88',
        pickupAddress: 'Port de Douala, Zone industrielle',
        deliveryAddress: 'Rue des Palmiers, Bonanjo',
        scheduledPickupAt: '2026-04-28T15:00',
        scheduledDeliveryAt: '2026-04-28T17:00',
        packagesCount: 3,
        totalWeightKg: 12.5,
        sellingPrice: 7500,
        currency: 'XAF',
        createdAt: '2026-04-28T12:00'
    },
    {
        id: 'MSN-005',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0437',
        delivererId: 'DLV-002',
        delivererName: 'Martin Mbarga',
        vehiclePlate: 'LT-8832-B',
        status: 'IN_TRANSIT',
        priority: 'HIGH',
        senderName: 'Jumbo Score Akwa',
        recipientName: 'Madeleine Biyong',
        recipientPhone: '+237 675 88 99 00',
        pickupAddress: 'Supermarché Jumbo, Akwa',
        deliveryAddress: 'Rue Prince Bell, Deido',
        scheduledPickupAt: '2026-04-28T10:30',
        scheduledDeliveryAt: '2026-04-28T12:00',
        actualPickupAt: '2026-04-28T10:45',
        packagesCount: 4,
        totalWeightKg: 8.0,
        sellingPrice: 4500,
        currency: 'XAF',
        createdAt: '2026-04-28T09:30'
    },
    {
        id: 'MSN-006',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        manifestNumber: 'MAN-2026-0436',
        delivererId: 'DLV-005',
        delivererName: 'Carine Beyene',
        vehiclePlate: 'LT-6643-D',
        status: 'IN_TRANSIT',
        priority: 'NORMAL',
        senderName: 'Librairie des Peuples Noirs',
        recipientName: 'Josiane Kamto',
        recipientPhone: '+237 650 01 12 23',
        pickupAddress: 'Av. Kennedy, Bonapriso',
        deliveryAddress: 'École Publique Makepe',
        scheduledPickupAt: '2026-04-28T11:00',
        scheduledDeliveryAt: '2026-04-28T13:00',
        actualPickupAt: '2026-04-28T11:20',
        packagesCount: 2,
        totalWeightKg: 5.5,
        sellingPrice: 3000,
        currency: 'XAF',
        createdAt: '2026-04-28T10:00'
    },
    {
        id: 'MSN-007',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0435',
        status: 'AT_HUB',
        priority: 'NORMAL',
        targetHubId: 'HUB-001',
        targetHubName: 'Hub Central Akwa',
        senderName: 'Express Shipping CI',
        recipientName: 'Patrice Nzié',
        recipientPhone: '+237 691 23 45 00',
        pickupAddress: 'Gare Voyageurs de Bonabéri',
        deliveryAddress: 'Rue Njo-Njo, Douala',
        scheduledPickupAt: '2026-04-27T14:00',
        actualPickupAt: '2026-04-27T14:30',
        packagesCount: 1,
        totalWeightKg: 2.3,
        sellingPrice: 2500,
        currency: 'XAF',
        createdAt: '2026-04-27T12:00'
    },
    {
        id: 'MSN-008',
        agencyId: 'AGN-001',
        branchId: 'BRN-003',
        branchName: 'Makepe',
        manifestNumber: 'MAN-2026-0434',
        delivererId: 'DLV-007',
        delivererName: 'Alice Manga',
        vehiclePlate: 'LT-9901-E',
        status: 'IN_TRANSIT',
        priority: 'LOW',
        senderName: 'Ets. Ngando & Fils',
        recipientName: 'Claudette Nkengne',
        recipientPhone: '+237 677 34 45 56',
        pickupAddress: 'Carrefour Elf Makepe',
        deliveryAddress: 'Résidence Les Cocotiers, Logbessou',
        scheduledPickupAt: '2026-04-28T09:00',
        scheduledDeliveryAt: '2026-04-28T11:00',
        actualPickupAt: '2026-04-28T09:15',
        packagesCount: 2,
        totalWeightKg: 6.8,
        sellingPrice: 3200,
        currency: 'XAF',
        createdAt: '2026-04-28T08:00'
    },
    {
        id: 'MSN-009',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0433',
        status: 'DELIVERED',
        priority: 'NORMAL',
        delivererId: 'DLV-001',
        delivererName: 'Jean-Paul Essomba',
        senderName: 'Total Energies Akwa',
        recipientName: 'Entreprise Bamileke SARL',
        recipientPhone: '+237 699 56 67 78',
        pickupAddress: 'Station Total, Carrefour des Anciens Combattants',
        deliveryAddress: 'Marché Nkoulouloun',
        scheduledPickupAt: '2026-04-27T08:00',
        actualPickupAt: '2026-04-27T08:05',
        actualDeliveryAt: '2026-04-27T09:30',
        packagesCount: 5,
        totalWeightKg: 22.0,
        sellingPrice: 12000,
        currency: 'XAF',
        createdAt: '2026-04-27T07:00'
    },
    {
        id: 'MSN-010',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        manifestNumber: 'MAN-2026-0432',
        status: 'CANCELLED',
        priority: 'NORMAL',
        senderName: 'Boutique Elegance Mode',
        recipientName: 'Sylvie Etoundi',
        recipientPhone: '+237 655 78 89 90',
        pickupAddress: 'Rue des Écoles, Bonapriso',
        deliveryAddress: 'Immeuble La Grâce, Bali',
        scheduledPickupAt: '2026-04-27T16:00',
        packagesCount: 1,
        totalWeightKg: 1.5,
        sellingPrice: 2000,
        currency: 'XAF',
        createdAt: '2026-04-27T14:00'
    },
    {
        id: 'MSN-011',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0431',
        status: 'DELIVERED',
        priority: 'HIGH',
        delivererId: 'DLV-008',
        delivererName: 'Thierry Ngatcha',
        senderName: 'Imprimerie Nationale du Cameroun',
        recipientName: 'Mairie de Douala III',
        recipientPhone: '+237 233 40 01 50',
        pickupAddress: 'Immeuble INC, Bonanjo',
        deliveryAddress: 'Hôtel de Ville de Douala III',
        scheduledPickupAt: '2026-04-26T09:00',
        actualPickupAt: '2026-04-26T09:10',
        actualDeliveryAt: '2026-04-26T10:45',
        packagesCount: 8,
        totalWeightKg: 35.0,
        sellingPrice: 18000,
        currency: 'XAF',
        createdAt: '2026-04-26T08:00'
    },
    {
        id: 'MSN-012',
        agencyId: 'AGN-001',
        branchId: 'BRN-003',
        branchName: 'Makepe',
        manifestNumber: 'MAN-2026-0430',
        status: 'AT_HUB',
        priority: 'LOW',
        targetHubId: 'HUB-002',
        targetHubName: 'Hub Bonapriso',
        senderName: 'Chaussures Doualaises',
        recipientName: 'Edmond Tchoua',
        recipientPhone: '+237 677 90 01 12',
        pickupAddress: 'Carrefour Elf Makepe',
        deliveryAddress: 'Avenue Ahmadou Ahidjo',
        scheduledPickupAt: '2026-04-27T11:00',
        actualPickupAt: '2026-04-27T11:30',
        packagesCount: 2,
        totalWeightKg: 3.5,
        sellingPrice: 2800,
        currency: 'XAF',
        createdAt: '2026-04-27T09:00'
    },
    {
        id: 'MSN-013',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0429',
        status: 'DELIVERED',
        priority: 'URGENT',
        delivererId: 'DLV-003',
        delivererName: 'Mireille Atangana',
        senderName: 'Clinique de la Caisse',
        recipientName: 'Armand Baloum',
        recipientPhone: '+237 681 12 23 34',
        pickupAddress: 'Clinique de la Caisse, Bonapriso',
        deliveryAddress: 'Quartier New Bell',
        scheduledPickupAt: '2026-04-26T07:00',
        actualPickupAt: '2026-04-26T07:02',
        actualDeliveryAt: '2026-04-26T07:52',
        packagesCount: 1,
        totalWeightKg: 0.5,
        sellingPrice: 6000,
        currency: 'XAF',
        createdAt: '2026-04-26T06:30'
    },
    {
        id: 'MSN-014',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        manifestNumber: 'MAN-2026-0428',
        status: 'FAILED',
        priority: 'NORMAL',
        delivererId: 'DLV-005',
        delivererName: 'Carine Beyene',
        senderName: 'Beauty House Douala',
        recipientName: 'Christelle Nguema',
        recipientPhone: '+237 694 34 45 56',
        pickupAddress: 'Rue Leclerc, Bonapriso',
        deliveryAddress: 'Résidence Palmier, Logpom',
        scheduledPickupAt: '2026-04-25T15:00',
        actualPickupAt: '2026-04-25T15:20',
        packagesCount: 1,
        totalWeightKg: 2.0,
        sellingPrice: 3500,
        currency: 'XAF',
        createdAt: '2026-04-25T13:00'
    },
    {
        id: 'MSN-015',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0427',
        status: 'DRAFT',
        priority: 'NORMAL',
        senderName: 'Cabinet Juridique Mbendé',
        recipientName: 'Tribunal de Grande Instance',
        recipientPhone: '+237 233 42 34 56',
        pickupAddress: 'Immeuble Mbendé, Bonanjo',
        deliveryAddress: 'TGI du Wouri, Bonanjo',
        scheduledPickupAt: '2026-04-29T09:00',
        packagesCount: 1,
        totalWeightKg: 1.8,
        sellingPrice: 2500,
        currency: 'XAF',
        createdAt: '2026-04-28T16:00'
    }
];
const mockHubs = [
    {
        id: 'HUB-001',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        name: 'Hub Central Akwa',
        address: '12 Rue Bebey Eyidi, Akwa',
        city: 'Douala',
        capacity: 50,
        currentOccupancy: 32,
        maxRetentionDays: 3,
        status: 'OPEN',
        managerName: 'Hyacinthe Nkoudou',
        managerPhone: '+237 699 10 20 30',
        openingHours: 'Lun–Sam 07h00–20h00'
    },
    {
        id: 'HUB-002',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Antenne Bonapriso',
        name: 'Hub Bonapriso',
        address: 'Av. Charles de Gaulle, Bonapriso',
        city: 'Douala',
        capacity: 30,
        currentOccupancy: 9,
        maxRetentionDays: 3,
        status: 'OPEN',
        managerName: 'Félicité Ngom',
        managerPhone: '+237 674 40 50 60',
        openingHours: 'Lun–Ven 08h00–19h00'
    },
    {
        id: 'HUB-003',
        agencyId: 'AGN-001',
        branchId: 'BRN-003',
        branchName: 'Antenne Makepe',
        name: 'Hub Makepe Logistique',
        address: 'Zone Industrielle Makepe, Entrepôt B',
        city: 'Douala',
        capacity: 40,
        currentOccupancy: 39,
        maxRetentionDays: 2,
        status: 'FULL',
        managerName: 'Léopold Simo',
        managerPhone: '+237 650 70 80 90',
        openingHours: 'Lun–Sam 07h30–18h30'
    }
];
const mockHubParcels = [
    {
        id: 'HPR-001',
        hubId: 'HUB-001',
        hubName: 'Hub Central Akwa',
        missionId: 'MSN-007',
        manifestNumber: 'MAN-2026-0435',
        trackingCode: 'TRK-20260427-0035',
        recipientName: 'Patrice Nzié',
        depositedAt: '2026-04-27T16:00',
        expectedWithdrawalDeadline: '2026-04-30T16:00',
        status: 'DEPOSITED'
    },
    {
        id: 'HPR-002',
        hubId: 'HUB-002',
        hubName: 'Hub Bonapriso',
        missionId: 'MSN-012',
        manifestNumber: 'MAN-2026-0430',
        trackingCode: 'TRK-20260427-0030',
        recipientName: 'Edmond Tchoua',
        depositedAt: '2026-04-27T14:00',
        expectedWithdrawalDeadline: '2026-04-30T14:00',
        status: 'DEPOSITED'
    },
    {
        id: 'HPR-003',
        hubId: 'HUB-001',
        hubName: 'Hub Central Akwa',
        missionId: 'MSN-020',
        manifestNumber: 'MAN-2026-0420',
        trackingCode: 'TRK-20260426-0020',
        recipientName: 'Aurélie Bella',
        depositedAt: '2026-04-26T10:00',
        expectedWithdrawalDeadline: '2026-04-29T10:00',
        withdrawnAt: '2026-04-27T09:00',
        withdrawnBy: 'Aurélie Bella (CNI: 123456)',
        status: 'WITHDRAWN'
    },
    {
        id: 'HPR-004',
        hubId: 'HUB-003',
        hubName: 'Hub Makepe Logistique',
        missionId: 'MSN-021',
        manifestNumber: 'MAN-2026-0410',
        trackingCode: 'TRK-20260425-0010',
        recipientName: 'Gérard Nyamsi',
        depositedAt: '2026-04-25T11:00',
        expectedWithdrawalDeadline: '2026-04-27T11:00',
        status: 'EXPIRED'
    },
    {
        id: 'HPR-005',
        hubId: 'HUB-001',
        hubName: 'Hub Central Akwa',
        missionId: 'MSN-022',
        manifestNumber: 'MAN-2026-0405',
        trackingCode: 'TRK-20260428-0042',
        recipientName: 'Florence Zang',
        depositedAt: '2026-04-28T08:30',
        expectedWithdrawalDeadline: '2026-05-01T08:30',
        status: 'DEPOSITED'
    }
];
const mockBillingPolicies = [
    {
        id: 'POL-001',
        agencyId: 'AGN-001',
        name: 'Tarif Standard 2025',
        description: 'Politique tarifaire par défaut applicable à toutes les livraisons standards.',
        isDefault: true,
        status: 'ACTIVE',
        validFrom: '2025-01-01',
        basePrice: 1500,
        perKmRate: 150,
        perKgRate: 200,
        currency: 'XAF',
        rulesCount: 5,
        promotionsCount: 2
    },
    {
        id: 'POL-002',
        agencyId: 'AGN-001',
        name: 'Express Premium',
        description: 'Tarification pour livraisons urgentes et express, avec surcharge horaire nuit.',
        isDefault: false,
        status: 'ACTIVE',
        validFrom: '2025-03-01',
        basePrice: 3000,
        perKmRate: 250,
        perKgRate: 300,
        currency: 'XAF',
        rulesCount: 8,
        promotionsCount: 0
    },
    {
        id: 'POL-003',
        agencyId: 'AGN-001',
        name: 'Tarif Entreprise Q1-2024',
        description: 'Politique tarifaire archivée du premier trimestre 2024.',
        isDefault: false,
        status: 'ARCHIVED',
        validFrom: '2024-01-01',
        validTo: '2024-12-31',
        basePrice: 1200,
        perKmRate: 120,
        perKgRate: 180,
        currency: 'XAF',
        rulesCount: 4,
        promotionsCount: 3
    }
];
const mockCommissions = [
    {
        id: 'COM-001',
        agencyId: 'AGN-001',
        delivererId: 'DLV-001',
        delivererName: 'Jean-Paul Essomba',
        missionId: 'MSN-001',
        manifestNumber: 'MAN-2026-0441',
        amount: 350,
        currency: 'XAF',
        status: 'VALIDATED',
        calculatedAt: '2026-04-28T10:00'
    },
    {
        id: 'COM-002',
        agencyId: 'AGN-001',
        delivererId: 'DLV-003',
        delivererName: 'Mireille Atangana',
        missionId: 'MSN-002',
        manifestNumber: 'MAN-2026-0440',
        amount: 200,
        currency: 'XAF',
        status: 'CALCULATED',
        calculatedAt: '2026-04-28T11:15'
    },
    {
        id: 'COM-003',
        agencyId: 'AGN-001',
        delivererId: 'DLV-001',
        delivererName: 'Jean-Paul Essomba',
        missionId: 'MSN-009',
        manifestNumber: 'MAN-2026-0433',
        amount: 1200,
        currency: 'XAF',
        status: 'PAID',
        calculatedAt: '2026-04-27T09:35',
        paidAt: '2026-04-27T18:00'
    },
    {
        id: 'COM-004',
        agencyId: 'AGN-001',
        delivererId: 'DLV-008',
        delivererName: 'Thierry Ngatcha',
        missionId: 'MSN-011',
        manifestNumber: 'MAN-2026-0431',
        amount: 1800,
        currency: 'XAF',
        status: 'PAID',
        calculatedAt: '2026-04-26T10:50',
        paidAt: '2026-04-26T18:00'
    },
    {
        id: 'COM-005',
        agencyId: 'AGN-001',
        delivererId: 'DLV-005',
        delivererName: 'Carine Beyene',
        missionId: 'MSN-014',
        manifestNumber: 'MAN-2026-0428',
        amount: 350,
        currency: 'XAF',
        status: 'DISPUTED',
        calculatedAt: '2026-04-25T16:00'
    },
    {
        id: 'COM-006',
        agencyId: 'AGN-001',
        delivererId: 'DLV-003',
        delivererName: 'Mireille Atangana',
        missionId: 'MSN-013',
        manifestNumber: 'MAN-2026-0429',
        amount: 600,
        currency: 'XAF',
        status: 'PAID',
        calculatedAt: '2026-04-26T07:55',
        paidAt: '2026-04-26T18:00'
    }
];
const missionStatusCounts = {
    DRAFT: mockMissions.filter((m)=>m.status === 'DRAFT').length,
    PENDING: mockMissions.filter((m)=>m.status === 'PENDING').length,
    ASSIGNED: mockMissions.filter((m)=>m.status === 'ASSIGNED').length,
    IN_TRANSIT: mockMissions.filter((m)=>m.status === 'IN_TRANSIT').length,
    AT_HUB: mockMissions.filter((m)=>m.status === 'AT_HUB').length,
    DELIVERED: mockMissions.filter((m)=>m.status === 'DELIVERED').length,
    FAILED: mockMissions.filter((m)=>m.status === 'FAILED').length,
    CANCELLED: mockMissions.filter((m)=>m.status === 'CANCELLED').length
};
}}),
"[project]/lib/services/branchAuthService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "branchAuthService": (()=>branchAuthService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-ssr] (ecmascript)");
;
;
;
const DEMO_PASSWORD = 'branch1234';
const TOKEN_KEY = 'tnt-branch-token';
const TENANT_KEY = 'tnt-branch-tenant-id';
const AGENCY_KEY = 'tnt-branch-agency-id';
const BRANCH_ID_KEY = 'tnt-branch-id';
const MANAGER_ID_KEY = 'tnt-branch-manager-id';
const MANAGER_NAME_KEY = 'tnt-branch-manager-name';
const BRANCH_NAME_KEY = 'tnt-branch-name';
const branchAuthService = {
    async login (email, password) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            if (password !== DEMO_PASSWORD) throw new Error('Mot de passe incorrect.');
            const branch = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"].find((b)=>b.managerEmail?.toLowerCase() === email.toLowerCase());
            if (!branch) throw new Error('Aucun responsable trouvé avec cet email.');
            if (!branch.managerId) throw new Error('Cette antenne n\'a pas de responsable assigné.');
            localStorage.setItem(TOKEN_KEY, 'demo-branch-jwt');
            localStorage.setItem(TENANT_KEY, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_TENANT_ID"]);
            localStorage.setItem(AGENCY_KEY, branch.agencyId);
            localStorage.setItem(BRANCH_ID_KEY, branch.id);
            localStorage.setItem(MANAGER_ID_KEY, branch.managerId);
            localStorage.setItem(MANAGER_NAME_KEY, branch.managerName ?? '');
            localStorage.setItem(BRANCH_NAME_KEY, branch.name);
            return branch;
        }
        let res;
        try {
            res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/auth/branch/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Tenant-Id': __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_TENANT_ID"]
                },
                body: JSON.stringify({
                    email,
                    password,
                    tenantId: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_TENANT_ID"]
                })
            });
        } catch  {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUserError"])(null, 'Impossible de joindre le serveur. Vérifiez votre connexion.'));
        }
        if (!res.ok) {
            const body = await res.json().catch(()=>({}));
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUserError"])({
                status: res.status,
                message: body?.message ?? ''
            }, 'Email ou mot de passe incorrect. Vérifiez vos identifiants.'));
        }
        const data = await res.json();
        localStorage.setItem(TOKEN_KEY, data.accessToken);
        localStorage.setItem(TENANT_KEY, data.tenantId);
        localStorage.setItem(AGENCY_KEY, data.agencyId);
        localStorage.setItem(BRANCH_ID_KEY, data.branchId);
        localStorage.setItem(MANAGER_ID_KEY, data.managerId);
        localStorage.setItem(MANAGER_NAME_KEY, data.managerName);
        localStorage.setItem(BRANCH_NAME_KEY, data.branchName);
        return {
            id: data.branchId,
            agencyId: data.agencyId,
            name: data.branchName,
            address: '',
            city: '',
            isHeadquarters: false,
            managerId: data.managerId,
            managerName: data.managerName,
            status: 'OPEN',
            openingHours: '',
            deliverersCount: 0,
            createdAt: ''
        };
    },
    logout () {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TENANT_KEY);
        localStorage.removeItem(AGENCY_KEY);
        localStorage.removeItem(BRANCH_ID_KEY);
        localStorage.removeItem(MANAGER_ID_KEY);
        localStorage.removeItem(MANAGER_NAME_KEY);
        localStorage.removeItem(BRANCH_NAME_KEY);
        window.location.href = '/branch/login';
    },
    isAuthenticated () {
        if ("TURBOPACK compile-time truthy", 1) return false;
        "TURBOPACK unreachable";
    },
    getSession () {
        if ("TURBOPACK compile-time truthy", 1) return null;
        "TURBOPACK unreachable";
        const token = undefined;
    },
    getCurrentBranchId () {
        if ("TURBOPACK compile-time truthy", 1) return null;
        "TURBOPACK unreachable";
    },
    getAgencyId () {
        if ("TURBOPACK compile-time truthy", 1) return null;
        "TURBOPACK unreachable";
    }
};
}}),
"[project]/app/branch/BranchSidebar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BranchSidebar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-ssr] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchAuthService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/branchAuthService.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const NAV_ITEMS = [
    {
        label: 'Dashboard',
        href: '/branch',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
        exact: true
    },
    {
        label: 'Personnel',
        href: '/branch/staff',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
    },
    {
        label: 'Flotte',
        href: '/branch/fleet',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
    },
    {
        label: 'Missions',
        href: '/branch/missions',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
    },
    {
        label: 'Hubs Relais',
        href: '/branch/hubs',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
    }
];
function BranchSidebar({ branchName, managerName }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const initials = managerName.split(' ').map((n)=>n[0]).join('').slice(0, 2).toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-60 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-16 flex items-center px-4 border-b border-gray-200 flex-shrink-0 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white font-bold text-xs",
                            children: "TA"
                        }, void 0, false, {
                            fileName: "[project]/app/branch/BranchSidebar.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/branch/BranchSidebar.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold text-gray-900 truncate",
                                children: branchName
                            }, void 0, false, {
                                fileName: "[project]/app/branch/BranchSidebar.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-orange-500 font-medium",
                                children: "Espace Antenne"
                            }, void 0, false, {
                                fileName: "[project]/app/branch/BranchSidebar.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/branch/BranchSidebar.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/branch/BranchSidebar.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex-1 overflow-y-auto py-4 px-3 space-y-0.5",
                children: NAV_ITEMS.map((item)=>{
                    const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: item.href,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative', isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'),
                        children: [
                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-500 rounded-r"
                            }, void 0, false, {
                                fileName: "[project]/app/branch/BranchSidebar.tsx",
                                lineNumber: 62,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                size: 16,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('flex-shrink-0', isActive ? 'text-orange-500' : 'text-gray-400')
                            }, void 0, false, {
                                fileName: "[project]/app/branch/BranchSidebar.tsx",
                                lineNumber: 64,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/app/branch/BranchSidebar.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.href, true, {
                        fileName: "[project]/app/branch/BranchSidebar.tsx",
                        lineNumber: 51,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/branch/BranchSidebar.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-200 p-3 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 px-2 py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-orange-700 text-xs font-semibold",
                                children: initials
                            }, void 0, false, {
                                fileName: "[project]/app/branch/BranchSidebar.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/branch/BranchSidebar.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-medium text-gray-900 truncate",
                                    children: managerName
                                }, void 0, false, {
                                    fileName: "[project]/app/branch/BranchSidebar.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-gray-400",
                                    children: "Responsable d'antenne"
                                }, void 0, false, {
                                    fileName: "[project]/app/branch/BranchSidebar.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/branch/BranchSidebar.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchAuthService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["branchAuthService"].logout(),
                            title: "Déconnexion",
                            className: "p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/app/branch/BranchSidebar.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/branch/BranchSidebar.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/branch/BranchSidebar.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/branch/BranchSidebar.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/branch/BranchSidebar.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/branch/layout.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BranchLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchAuthService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/branchAuthService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$branch$2f$BranchSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/branch/BranchSidebar.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function BranchLayout({ children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isLoginPage = pathname === '/branch/login';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isLoginPage) {
            setReady(true);
            return;
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchAuthService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["branchAuthService"].isAuthenticated()) {
            router.replace('/branch/login');
            return;
        }
        setSession(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchAuthService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["branchAuthService"].getSession());
        setReady(true);
    }, [
        pathname,
        isLoginPage,
        router
    ]);
    if (!ready) return null;
    if (isLoginPage) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50",
            children: children
        }, void 0, false, {
            fileName: "[project]/app/branch/layout.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this);
    }
    if (!session) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen overflow-hidden bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$branch$2f$BranchSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                branchName: session.branchName,
                managerName: session.managerName
            }, void 0, false, {
                fileName: "[project]/app/branch/layout.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-w-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-gray-900",
                                        children: session.branchName
                                    }, void 0, false, {
                                        fileName: "[project]/app/branch/layout.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400",
                                        children: "Rapid Express Douala"
                                    }, void 0, false, {
                                        fileName: "[project]/app/branch/layout.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/branch/layout.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] font-semibold bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-1 rounded-full",
                                    children: "Espace Antenne"
                                }, void 0, false, {
                                    fileName: "[project]/app/branch/layout.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/branch/layout.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/branch/layout.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 overflow-auto",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/app/branch/layout.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/branch/layout.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/branch/layout.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=_ec6d848b._.js.map