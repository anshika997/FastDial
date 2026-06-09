import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import pill1 from "../../assets/pill1.jpg";
import pill2 from "../../assets/pill2.jpg";
import pill3 from "../../assets/pill3.jpg";
import epWhite from "../../assets/Logo.svg";
import surroundings from "../../assets/surrounds.png";
import person1 from "../../assets/person1.jpg";
import person2 from "../../assets/person2.jpg";
import person3 from "../../assets/person3.jpg";

// ⬇️ CHANGED: scattered spheres more randomly
const spheres = [
    { top: "12%", left: "88%", size: 32, color: "rgba(244,94,41,1)" },
    { top: "48%", left: "75%", size: 24, color: "rgba(142,55,24,1)" },
    { top: "18%", left: "35%", size: 18, color: "rgba(200,100,60,0.7)" },

    { top: "30%", left: "25%", size: 18, color: "rgba(2,40,89,1)" },
    { top: "64%", left: "40%", size: 28, color: "rgba(244,94,41,1)" },
    { top: "70%", left: "55%", size: 16, color: "rgba(142,55,24,1)" },
    { top: "20%", left: "65%", size: 12, color: "rgba(19,60,150,1)" },
    { top: "56%", left: "14%", size: 38, color: "rgba(4,85,191,1)" },
    { top: "32%", left: "22%", size: 18, color: "rgba(2,40,89,1)" },
    { top: "73%", left: "47%", size: 22, color: "rgba(30,144,255,1)" },
    { top: "18%", left: "50%", size: 20, color: "rgba(34,139,34,0.85)" },
    { top: "59%", left: "33%", size: 24, color: "rgba(50,205,50,0.8)" },
    { top: "65%", left: "20%", size: 16, color: "rgba(0,128,0,0.9)" },


    { top: "12%", left: "45%", size: 14, color: "rgba(186,85,211,0.9)" },
    { top: "38%", left: "68%", size: 20, color: "rgba(199,21,133,0.85)" },
    { top: "50%", left: "60%", size: 18, color: "rgba(138,43,226,0.9)" }
];

// ⬇️ NEW: spheres that appear with pills
const newSpheres = [
    { top: "22%", left: "50%", size: 20, color: "rgba(255,200,0,1)" },
    { top: "75%", left: "20%", size: 26, color: "rgba(100,200,255,1)" },
    { top: "65%", left: "80%", size: 22, color: "rgba(255,100,200,1)" },
    { top: "40%", left: "60%", size: 16, color: "rgba(50,220,100,1)" },
    { top: "55%", left: "12%", size: 38, color: "rgba(4,85,191,1)" },
    { top: "30%", left: "25%", size: 18, color: "rgba(2,40,89,1)" },
    { top: "64%", left: "40%", size: 28, color: "rgba(244,94,41,1)" },
    { top: "70%", left: "55%", size: 16, color: "rgba(142,55,24,1)" },
    { top: "15%", left: "65%", size: 12, color: "rgba(19,60,150,1)" },
];

const AnimatedShape = ({ imageUrl }) => {
    const controlsBottom = useAnimation();
    const controlsTop = useAnimation();

    const epControls = useAnimation();
    const surroundControls = useAnimation();

    // ⬇️ NEW: controls for spheres
    const sphereControls = useAnimation();
    const newSphereControls = useAnimation();

    useEffect(() => {
        const runBottomSequence = async () => {
            await controlsBottom.start("moveUp");
            await new Promise((res) => setTimeout(res, 800));
            await controlsBottom.start("moveDown");
            await controlsBottom.start("fadeOut");
        };

        const runTopSequence = async () => {
            await controlsTop.start("moveDown");
          await new Promise((res) => setTimeout(res, 800));
          await controlsTop.start("moveUp");
          await controlsTop.start("fadeOut");
      };

        const runEPAndSurroundSequence = async () => {
            // pills moving in → EP moves NW and surroundings scale+fade
            epControls.start("expandAndExit");
            surroundControls.start("scaleFade");

            // ⬇️ NEW: fade out old spheres, show new spheres
            sphereControls.start("fadeOut");
            newSphereControls.start("appear");

            // wait until pills finish their moveDown phase
            await Promise.all([runBottomSequence(), runTopSequence()]);

            // pills moving out → EP and surroundings return
            epControls.start("returnCenter");
            surroundControls.start("return");

            // ⬇️ NEW: bring back old spheres, hide new spheres
            sphereControls.start("idle");
            newSphereControls.start("disappear");
        };

        runEPAndSurroundSequence();

        const loopAnimation = async () => {
            while (true) {
                await runEPAndSurroundSequence();
                await new Promise((res) => setTimeout(res, 2000));
            }
        };

        loopAnimation();
    }, [
        controlsBottom,
        controlsTop,
        epControls,
        surroundControls,
        sphereControls,
        newSphereControls,
    ]);

    const bottomVariants = {
        hidden: { opacity: 0, y: "80%", scale: 1 },
        moveUp: {
            opacity: 1,
            y: "25%",
            transition: { duration: 2, ease: "easeOut" },
        },
        moveDown: {
            opacity: 1,
            y: "80%",
            transition: { duration: 1.5, ease: "easeIn" },
        },
        fadeOut: {
            opacity: 0,
            y: "100%",
            transition: { duration: 0.4, ease: "linear" },
        },
    };

    const topVariants = {
        hidden: { opacity: 1, y: "-80%", scale: 1 },
        moveDown: {
            opacity: 1,
            y: "-30%",
            transition: { duration: 2, ease: "easeOut" },
        },
        moveUp: {
            opacity: 1,
            y: "-80%",
            transition: { duration: 1.5, ease: "easeIn" },
        },
        fadeOut: {
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.4, ease: "linear" },
        },
    };

    const epVariants = {
        idle: { x: 0, y: 0, scale: 1, opacity: 1 },
        expandAndExit: {
            x: "-100px",
            y: "-100px",
            opacity: 0,
            transition: { duration: 2, ease: "easeOut" },
        },
        returnCenter: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: { duration: 1, ease: "easeInOut" },
        },
    };

    const surroundVariants = {
        idle: { scale: 1, opacity: 1 },
        scaleFade: {
            scale: 1.2,
            opacity: 0,
            transition: { duration: 2, ease: "easeOut" },
        },
        return: {
            scale: 1,
            opacity: 1,
            transition: { duration: 1, ease: "easeInOut" },
        },
    };

    // ⬇️ NEW: sphere animation variants
    const sphereVariants = {
        idle: { opacity: 1, scale: 1 },
        fadeOut: { opacity: 0, transition: { duration: 1, ease: "easeOut" } },
    };

    // ⬇️ NEW: new sphere animation variants
    const newSphereVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        appear: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 120, damping: 14 },
        },
        disappear: { opacity: 0, scale: 0.5, transition: { duration: 0.8 } },
    };

    return (
        <div
            style={{
                width: "40.18rem",
                height: "33.06rem",
                overflow: "hidden",
                borderRadius: "12px",
                position: "relative",
                display: "flex",
                marginLeft: "15px",
            }}
        >
            {/* ⬇️ UPDATED: Background scattered spheres */}
            {spheres.map((sphere, idx) => (
                <motion.div
                    key={`sphere-${idx}`}
                    style={{
                        position: "absolute",
                        top: sphere.top,
                        left: sphere.left,
                        width: `${sphere.size}px`,
                        height: `${sphere.size}px`,
                        backgroundColor: sphere.color,
                        borderRadius: "50%",
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={sphereControls}
                    variants={sphereVariants}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 14,
                        delay: idx * 0.15,
                    }}
                />
            ))}

            {/* ⬇️ NEW: Spheres appearing with pills */}
            {newSpheres.map((sphere, idx) => (
                <motion.div
                    key={`newsphere-${idx}`}
                    style={{
                        position: "absolute",
                        top: sphere.top,
                        left: sphere.left,
                        width: `${sphere.size}px`,
                        height: `${sphere.size}px`,
                        backgroundColor: sphere.color,
                        borderRadius: "50%",
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                    variants={newSphereVariants}
                    initial="hidden"
                    animate={newSphereControls}
                />
            ))}

            {/* logo */}
            <motion.img
                src={epWhite}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "55%",
                    width: "150px",
                    zIndex: 5,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                variants={epVariants}
                initial="idle"
                animate={epControls}
            />

            <motion.img
                src={surroundings}
                style={{
                    position: "absolute",
                    top: "52%",
                    left: "60%",
                    bottom: "50%",
                    width: "600px",
                    zIndex: 4,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                variants={surroundVariants}
                initial="idle"
                animate={surroundControls}
            />

            {/* Bottom Pills */}
            <motion.img
                src={pill1}
                style={{
                  width: "24.54%",
                  height: "71.85%",
                  position: "absolute",
                    top: "34.51%",
                    left: "44.82%",
                    objectFit: "cover",
                    borderRadius: "247.5px",
                    borderWidth: "6px",
                    borderStyle: "solid",
                    borderColor: "rgba(228, 92, 60, 0.6)",
                }}
                variants={bottomVariants}
                initial="hidden"
                animate={controlsBottom}
            />
            <motion.img
                src={pill2}
                style={{
                  width: "22.71%",
                  height: "71.83%",
                  position: "absolute",
                    top: "50.25%",
                    left: "77.29%",
                    objectFit: "cover",
                    objectPosition: "70% center",
                    borderRadius: "247.5px",
                    borderWidth: "6px",
                    borderStyle: "solid",
                    borderColor: "rgba(228, 92, 60, 0.6)",
                }}
                variants={bottomVariants}
                initial="hidden"
                animate={controlsBottom}
            />
            <motion.img
                src={pill3}
                style={{
                  width: "22.54%",
                  height: "71.85%",
                  objectFit: "cover",
                  position: "absolute",
                    bottom: "-10%",
                    left: "16.22%",
                    borderRadius: "247.5px",
                    borderWidth: "6px",
                    borderStyle: "solid",
                    borderColor: "rgba(228, 92, 60, 0.6)",
                }}
                variants={bottomVariants}
                initial="hidden"
                animate={controlsBottom}
            />

            {/* Top Pills */}
            <motion.img
                src={person1}
                style={{
                  width: "24.54%",
                  height: "71.85%",
                  objectFit: "cover",
                  position: "absolute",
                    top: "0.75%",
                    left: "44.82%",
                    borderRadius: "247.5px",
                    borderWidth: "6px",
                    borderStyle: "solid",
                    borderColor: "rgba(111, 77, 193, 0.6)",
                }}
                variants={topVariants}
                initial="hidden"
                animate={controlsTop}
            />
            <motion.img
                src={person2}
                style={{
                  width: "24.54%",
                  height: "71.85%",
                  objectFit: "cover",
                  position: "absolute",
                    top: "17.02%",
                    left: "75.37%",
                    borderRadius: "247.5px",
                    borderWidth: "6px",
                    borderStyle: "solid",
                    borderColor: "rgba(111, 77, 193, 0.6)",
                }}
                variants={topVariants}
                initial="hidden"
                animate={controlsTop}
            />
            <motion.img
                src={person3}
                style={{
                  width: "24.54%",
                  height: "71.85%",
                  objectFit: "cover",
                  position: "absolute",
                    top: "5.67%",
                    left: "14.22%",
                    borderRadius: "247.5px",
                    borderWidth: "6px",
                    borderStyle: "solid",
                    borderColor: "rgba(111, 77, 193, 0.6)",
                }}
                variants={topVariants}
                initial="hidden"
                animate={controlsTop}
            />
        </div>
    );
};

export default AnimatedShape;
