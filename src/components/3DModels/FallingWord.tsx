import { useThree } from '@react-three/fiber/native';
import FallingLetter from "./FallingLetter";

const modelO = require("../../assets/3DModels/O.glb");
const modelR = require("../../assets/3DModels/R.glb");
const modelD = require("../../assets/3DModels/D.glb");
const modelE = require("../../assets/3DModels/E.glb");
const modelExclamation = require("../../assets/3DModels/exclamation.glb");

const wordArr = [
    {
        modelSource: modelO,
    },
    {
        modelSource: modelR,
    },
    {
        modelSource: modelD,
    },
    {
        modelSource: modelE,
    },
    {
        modelSource: modelR,
    },
    {
        modelSource: modelE,
    },
    {
        modelSource: modelD,
    },
    {
        modelSource: modelExclamation,
    },
];

const FallingWord = ({ reset }: { reset: number }) => {
    const { viewport } = useThree();
    const width = viewport.width - 0.5;
    const spacing = width / 8

    const handleLetters = () => {
        return wordArr.map((letter, index) => {
            const xPos = (index * spacing) - (width / 2) + (spacing / 2);
            return <FallingLetter key={index} xPos={xPos} reset={reset} modelSource={letter.modelSource} />
        });
    };

    return (
        <>
            {handleLetters()}
        </>
    );
};

export default FallingWord;
