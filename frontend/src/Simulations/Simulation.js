import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Unity, { UnityContent } from "react-unity-webgl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Simulation = () => {
    const [simulation, setSimulation] = useState({});
    // const [progression, setProgression] = useState(0);
    // const [display, setDisplay] = useState(false);

    // Dummy data for showing a simulation (cell simulation)
    useEffect(() => {
        let tmp = {
            title: "Cell Simulation",
            fileName: "CellSimulation",
            description: `The cell is the basic structural, functional, and biological unit of all known organisms. A cell is the smallest unit of life. Cells are often called the "building blocks of life". The study of cells is called cell biology, cellular biology, or cytology. Cells consist of cytoplasm enclosed within a membrane, which contains many biomolecules such as proteins and nucleic acids. Most plant and animal cells are only visible under a light microscope, with dimensions between 1 and 100 micrometres. Electron microscopy gives a much higher resolution showing greatly detailed cell structure. Organisms can be classified as unicellular (consisting of a single cell such as bacteria) or multicellular (including plants and animals). Most unicellular organisms are classed as microorganisms. The number of cells in plants and animals varies from species to species; it has been estimated that humans contain somewhere around 40 trillion (4×10^13) cells. The human brain accounts for around 80 billion of these cells.`,
        };

        setSimulation(tmp);
    }, []);

    const unityContent = new UnityContent(
        `/static/Simulators/${simulation.fileName}/Build/${simulation.fileName}.json`,
        `/static/Simulators/${simulation.fileName}/Build/UnityLoader.js`
    );

    // useEffect(() => {
    //     unityContent.on("progress", progress => {
    //         progress === 1 && setDisplay(true)
    //         setProgression(progression)
    //     });
    // }, [unityContent]);

    return (
        <>
            {simulation.fileName &&
                <Container fluid className="mt-4" style={{ maxWidth: "100rem" }}>
                    <h3 className="text-center">{simulation.title}</h3>
                    <p className="text-justify my-4">{simulation.description}</p>

                    {/* <div className={!display ? "text-center" : "d-none"}>
                        <Spinner animation="grow" className="mb-2 mr-2" />
                        <div>{`Loading ${Math.floor(progression * 100)}%...`}</div>
                    </div> */}

                    {/* <div className={!display && "d-none"}> */}
                    <div>
                        <div className="rounded border border-dark p-2">
                            <Unity className="rounded" unityContent={unityContent} />
                        </div>

                        <Button
                            className="d-block mx-auto my-4"
                            onClick={() => unityContent.setFullscreen(true)}
                        >
                            <FontAwesomeIcon
                                className="mr-2"
                                icon={["fas", "expand"]}
                            />
                            Enter Fullscreen
                        </Button>
                    </div>
                </Container>
            }
        </>
    );
};

export default Simulation;
