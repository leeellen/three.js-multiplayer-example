import { useState, useEffect, useRef } from 'react';
import { MeshNormalMaterial } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { socket } from './utils/socket';
import { Socket } from 'socket.io-client';

type posType = [number, number, number];

type ClientType = {
    [id: string]: { position: posType; rotation: posType };
};

function App() {
    const [socketClient, setSocketClient] = useState<any>(null);
    const [clients, setClients] = useState<ClientType>();

    useEffect(() => {
        // On mount initialize the socket connection
        setSocketClient(socket);

        // Dispose gracefuly
        return () => {
            if (socketClient) socketClient.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socketClient) {
            socketClient.on('move', (clients) => {
                setClients(clients);
            });
        }
    }, [socketClient]);

    if (!socketClient) return <></>;

    return (
        <Canvas camera={{ position: [0, 1, -5], near: 0.1, far: 1000 }}>
            <ControlsWrapper socket={socketClient} />
            <gridHelper rotation={[0, 0, 0]} />

            {/* Filter myself from the client list and create user boxes with IDs */}
            {clients &&
                Object.keys(clients)
                    .filter((clientKey) => clientKey !== socketClient.id)
                    .map((client) => {
                        const { position, rotation } = clients[client];
                        return <UserWrapper key={client} id={client} position={position} rotation={rotation} />;
                    })}
        </Canvas>
    );
}

export default App;

function ControlsWrapper({ socket }: { socket: Socket<any, any> }) {
    const controlsRef = useRef<any>(null);
    const [updateCallback, setUpdateCallback] = useState(null);

    useEffect(() => {
        const onControlsChange = (val) => {
            const { position, rotation } = val.target.object;
            const { id } = socket;

            const posArray = [0, 0, 0];
            const rotArray = [0, 0, 0];

            position.toArray(posArray);
            rotation.toArray(rotArray);

            socket.emit('move', {
                id,
                rotation: rotArray,
                position: posArray,
            });
        };

        if (controlsRef.current) {
            setUpdateCallback(controlsRef.current.addEventListener('change', onControlsChange));
        }

        return () => {
            if (updateCallback && controlsRef.current)
                controlsRef.current.removeEventListener('change', onControlsChange);
        };
    }, [controlsRef, socket]);

    return <OrbitControls ref={controlsRef} />;
}

type UserWrapperProps = {
    position: posType;
    rotation: posType;
    id: string;
};
function UserWrapper({ position, rotation, id }: UserWrapperProps) {
    return (
        <mesh position={position} rotation={rotation} material={new MeshNormalMaterial()}>
            {/* Optionally show the ID above the user's mesh */}
            <Text position={[0, 1.0, 0]} color="black" anchorX="center" anchorY="middle">
                {id}
            </Text>
            <sphereGeometry args={[0.5, 50, 10]} />
            <meshStandardMaterial metalness={1} roughness={0.4} color="#4b4b4b" />
        </mesh>
    );
}
