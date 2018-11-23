import { useMemo } from "react"
import motionValue, { MotionValue } from "../motion-value"

type PoseSetter = {
    (pose: string | string[]): void
    cycle: () => void
}

const usePose = (initPose: string | string[] = "default", poses?: string[]) => {
    return useMemo((): [MotionValue, PoseSetter] => {
        let i = 0

        const pose = motionValue(initPose)

        const setPose: PoseSetter = newPose => {
            if (poses && typeof newPose === "string") {
                const poseIndex = poses.indexOf(newPose)
                i = poseIndex > -1 ? poseIndex : i
            }
            pose.set(newPose)
        }

        // Add cycle functionality
        setPose.cycle = () => {
            if (!poses) return

            const numPoses = poses.length
            i++
            if (i >= numPoses) i = 0
            setPose(poses[i])
        }

        return [pose, setPose]
    }, poses || [])
}

export default usePose
