import React from "react";
import { Container } from "react-bootstrap";
import Unity, { UnityContent } from "react-unity-webgl";

const CellSimulation = () => {
    const unityContent = new UnityContent(
        "/static/Simulators/CellSimulation/Build/CellSimulation.json",
        "/static/Simulators/CellSimulation/Build/UnityLoader.js"
    );

    return (
        <>
            <Container className="mt-4 p-0">
                <h3 className="text-center">Cell Simulation</h3>

                <p className="text-justify my-4">
                    The cell is the basic structural, functional, and biological
                    unit of all known organisms. A cell is the smallest unit of
                    life. Cells are often called the "building blocks of life".
                    The study of cells is called cell biology, cellular biology,
                    or cytology. Cells consist of cytoplasm enclosed within a
                    membrane, which contains many biomolecules such as proteins
                    and nucleic acids. Most plant and animal cells are only
                    visible under a light microscope, with dimensions between 1
                    and 100 micrometres. Electron microscopy gives a much higher
                    resolution showing greatly detailed cell structure.
                    Organisms can be classified as unicellular (consisting of a
                    single cell such as bacteria) or multicellular (including
                    plants and animals). Most unicellular organisms are classed
                    as microorganisms. The number of cells in plants and animals
                    varies from species to species; it has been estimated that
                    humans contain somewhere around 40 trillion (4×1013) cells.
                    The human brain accounts for around 80 billion of these
                    cells.
                </p>
            </Container>
            <div>
                <Unity unityContent={unityContent} />
            </div>
        </>
    );
};

export default CellSimulation;
