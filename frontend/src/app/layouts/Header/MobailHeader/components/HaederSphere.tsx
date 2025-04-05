

import React, { useEffect, useRef} from 'react';

interface Particle {
    x: number;
    y: number;
    z: number;
    velX: number;
    velY: number;
    velZ: number;
    age: number;
    dead: boolean;
    right: boolean;
    next: Particle | null;
    prev: Particle | null;
    attack: number;
    hold: number;
    decay: number;
    initValue: number;
    holdValue: number;
    lastValue: number;
    stuckTime: number;
    accelX: number;
    accelY: number;
    accelZ: number;
    projX?: number;
    projY?: number;
    alpha?: number;
}

const SphereAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sphereWrapRef = useRef<HTMLDivElement>(null);

    const scale =1;
    const sphereRad: number = 60; // радиус сферы

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context) return;

        let displayWidth: number, displayHeight: number;
        let timer: NodeJS.Timeout;
        let wait: number = 1;
        let count: number = wait - 1;
        const numToAddEachFrame: number = 8;
        const rgbString: string = "rgba(101,126,212,1)"; // цвет частиц
        const particleAlpha: number = 1;
        let fLen: number = 320;
        let projCenterX: number, projCenterY: number;
        let zMax: number;
        let particleList: { first: Particle | null } = { first: null };
        let recycleBin: { first: Particle | null } = { first: null };
        const randAccelX: number = 0.1;
        const randAccelY: number = 0.1;
        const randAccelZ: number = 0.1;
        const gravity: number = 0;
        const particleRad: number = 1.2; // размер частиц
        const sphereCenterY: number = 0;
        const sphereCenterZ: number = -3 - sphereRad;
        const zeroAlphaDepth: number = -750;
        let turnSpeed: number = (2 * Math.PI) / 1200; // скорость вращения сферы
        let turnAngle: number = 0;

        const init = () => {
            if (!sphereWrapRef.current) return;

            displayWidth = canvas.width = sphereWrapRef.current.offsetWidth;
            displayHeight = canvas.height = sphereWrapRef.current.offsetHeight;
            projCenterX = displayWidth / 3; // центр сферы по оси X
            projCenterY = displayHeight / 2; // центр сферы по оси Y
            zMax = fLen - 2;
            particleList = { first: null };
            recycleBin = { first: null };
        };

        const addParticle = (x0: number, y0: number, z0: number, vx0: number, vy0: number, vz0: number): Particle => {
            let newParticle: Particle;
            if (recycleBin.first != null) {
                newParticle = recycleBin.first;
                if (newParticle.next != null) {
                    recycleBin.first = newParticle.next;
                    newParticle.next.prev = null;
                } else {
                    recycleBin.first = null;
                }
            } else {
                newParticle = {
                    x: x0,
                    y: y0,
                    z: z0,
                    velX: vx0,
                    velY: vy0,
                    velZ: vz0,
                    age: 0,
                    dead: false,
                    right: Math.random() < 0.5,
                    next: null,
                    prev: null,
                    attack: 0,
                    hold: 0,
                    decay: 0,
                    initValue: 0,
                    holdValue: 0,
                    lastValue: 0,
                    stuckTime: 0,
                    accelX: 0,
                    accelY: 0,
                    accelZ: 0,
                };
            }

            if (particleList.first == null) {
                particleList.first = newParticle;
                newParticle.prev = null;
                newParticle.next = null;
            } else {
                newParticle.next = particleList.first;
                particleList.first.prev = newParticle;
                particleList.first = newParticle;
                newParticle.prev = null;
            }

            newParticle.x = x0;
            newParticle.y = y0;
            newParticle.z = z0;
            newParticle.velX = vx0;
            newParticle.velY = vy0;
            newParticle.velZ = vz0;
            newParticle.age = 0;
            newParticle.dead = false;
            newParticle.right = Math.random() < 0.5;

            // Инициализация дополнительных свойств
            newParticle.attack = 50;
            newParticle.hold = 50;
            newParticle.decay = 100;
            newParticle.initValue = 0;
            newParticle.holdValue = particleAlpha;
            newParticle.lastValue = 0;
            newParticle.stuckTime = 90 + Math.random() * 20;
            newParticle.accelX = 0;
            newParticle.accelY = gravity;
            newParticle.accelZ = 0;

            return newParticle;
        };

        const recycle = (p: Particle) => {
            if (particleList.first === p) {
                if (p.next != null) {
                    p.next.prev = null;
                    particleList.first = p.next;
                } else {
                    particleList.first = null;
                }
            } else {
                if (p.prev != null) { // Проверка на null
                    if (p.next == null) {
                        p.prev.next = null;
                    } else {
                        p.prev.next = p.next;
                        p.next.prev = p.prev;
                    }
                }
            }

            if (recycleBin.first == null) {
                recycleBin.first = p;
                p.prev = null;
                p.next = null;
            } else {
                p.next = recycleBin.first;
                recycleBin.first.prev = p;
                recycleBin.first = p;
                p.prev = null;
            }
        };

        const onTimer = () => {
            count++;
            if (count >= wait) {
                count = 0;
                for (let i = 0; i < numToAddEachFrame; i++) {
                    const theta = Math.random() * 2 * Math.PI;
                    const phi = Math.acos(Math.random() * 2 - 1);
                    const x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
                    const y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
                    const z0 = sphereRad * Math.cos(phi);
                    const p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002 * x0, 0.002 * y0, 0.002 * z0);
                    p.attack = 50;
                    p.hold = 50;
                    p.decay = 100;
                    p.initValue = 0;
                    p.holdValue = particleAlpha;
                    p.lastValue = 0;
                    p.stuckTime = 90 + Math.random() * 20;
                    p.accelX = 0;
                    p.accelY = gravity;
                    p.accelZ = 0;
                }
            }

            turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);
            const sinAngle = Math.sin(turnAngle);
            const cosAngle = Math.cos(turnAngle);

            context.clearRect(0, 0, displayWidth, displayHeight);

            let p = particleList.first;
            while (p != null) {
                const nextParticle = p.next;
                p.age++;
                if (p.age > p.stuckTime) {
                    p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1);
                    p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1);
                    p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1);
                    p.x += p.velX;
                    p.y += p.velY;
                    p.z += p.velZ;
                }

                const rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ);
                const rotZ = -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ;
                const m = scale * fLen / (fLen - rotZ);
                p.projX = rotX * m + projCenterX;
                p.projY = p.y * m + projCenterY;

                if (p.age < p.attack + p.hold + p.decay) {
                    if (p.age < p.attack) {
                        p.alpha = ((p.holdValue - p.initValue) / p.attack) * p.age + p.initValue;
                    } else if (p.age < p.attack + p.hold) {
                        p.alpha = p.holdValue;
                    } else if (p.age < p.attack + p.hold + p.decay) {
                        p.alpha = ((p.lastValue - p.holdValue) / p.decay) * (p.age - p.attack - p.hold) + p.holdValue;
                    }
                } else {
                    p.dead = true;
                }

                const outsideTest = (p.projX > displayWidth) || (p.projX < 0) || (p.projY < 0) || (p.projY > displayHeight) || (rotZ > zMax);

                if (outsideTest || p.dead) {
                    recycle(p);
                } else {
                    let depthAlphaFactor = 1 - rotZ / zeroAlphaDepth;
                    depthAlphaFactor = depthAlphaFactor > 1 ? 1 : depthAlphaFactor < 0 ? 0 : depthAlphaFactor;
                    context.fillStyle = rgbString + depthAlphaFactor * (p.alpha || 1) + ")";
                    context.beginPath();
                    context.arc(p.projX || 0, p.projY || 0, m * particleRad, 0, 2 * Math.PI, false);
                    context.closePath();
                    context.fill();
                }

                p = nextParticle;
            }
        };

        init();
        timer = setInterval(onTimer, 10 / 24);

        const handleResize = () => {
            init();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [scale]);

    return (
        <div id="sphere-wrap" className='loader-example' ref={sphereWrapRef} style={{ height:36, width:36, overflow:'hidden'}}>
            <canvas id="sphere"  ref={canvasRef}></canvas>
        </div>
    );
};

export default SphereAnimation;