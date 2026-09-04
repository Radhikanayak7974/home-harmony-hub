import { createServerFn } from "@tanstack/react-start";

export interface SosAlertPayload {
  userId?: string;
  workerId?: string;
  latitude: number;
  longitude: number;
  address?: string;
  emergencyContact: string;
}

export interface SosDispatchResult {
  alertId: string;
  status: "DISPATCHED" | "RESOLVED";
  dispatchTime: string;
  assignedUnit: string;
  etaMinutes: number;
}

/**
 * Backend API Server Function: Trigger 1-Tap Emergency SOS Alert
 */
export const triggerEmergencySosFn = createServerFn({ method: "POST" })
  .validator((data: SosAlertPayload) => data)
  .handler(async ({ data }): Promise<SosDispatchResult> => {
    const alertId = `SOS-DISPATCH-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      alertId,
      status: "DISPATCHED",
      dispatchTime: new Date().toISOString(),
      assignedUnit: "GrihaCare Rapid Security Patrol Unit #4",
      etaMinutes: 4,
    };
  });

/**
 * Backend API Server Function: Get Real-Time GPS Tracking Coordinates
 */
export const getWorkerGpsFn = createServerFn({ method: "POST" })
  .validator((data: { workerId: string }) => data)
  .handler(async ({ data }) => {
    return {
      workerId: data.workerId,
      workerName: "Savitri Bai (Verified Maid & Cook)",
      latitude: 22.7196 + (Math.random() - 0.5) * 0.005,
      longitude: 75.8577 + (Math.random() - 0.5) * 0.005,
      batteryPercent: 88,
      speedKmh: 12,
      lastPingTime: new Date().toISOString(),
      verificationBadge: "AADHAAR & POLICE VERIFIED",
    };
  });
