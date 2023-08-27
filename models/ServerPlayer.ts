type ServerPlayer = {
    uuid?: string;
    name?: string;
    foreign?: boolean;
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation?: {
        pitch: number;
        yaw: number;
        roll: number;
    }
}