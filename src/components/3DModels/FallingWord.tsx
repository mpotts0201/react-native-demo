import { useEffect, useRef } from "react";
import { useThree, useFrame } from '@react-three/fiber/native';
import { useDispatch, useSelector } from "react-redux";
import FallingLetter from "./FallingLetter";
import { selectShow, setShow } from "../../../store/slices/fullScreen3DSlice";

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

const FallingWord = () => {
    const dispatch = useDispatch();
    const show = useSelector(selectShow);
    const finishedCount = useRef<Set<number>>(new Set());
    const { viewport } = useThree();
    const width = viewport.width - 0.5;
    const spacing = width / wordArr.length;

    
    useFrame(() => {
        if (finishedCount.current && show) {
            if (finishedCount.current.size == wordArr.length) {
                dispatch(setShow(false));
            }
        }
    });

    const handleLetters = () => {
        return wordArr.map((letter, index) => {
            const xPos = (index * spacing) - (width / 2) + (spacing / 2);
            return <FallingLetter finishedCount={finishedCount} key={index} xPos={xPos} modelSource={letter.modelSource} />;
        });
    };

    return (
        <>
            {handleLetters()}
        </>
    );
};

export default FallingWord;
