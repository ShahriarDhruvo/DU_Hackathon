import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

const Rooms = () => {
    const [key, setKey] = useState("section1");

    return (
        // <Container className="vertical-center">
        //     <div>
        //         <Tabs
        //             id="controlled-tab-example"
        //             activeKey={key}
        //             onSelect={(k) => setKey(k)}
        //         >
        //             <Tab eventKey="home" title="Home">
        //                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
        //                 Eaque necessitatibus modi itaque est nemo, minus
        //                 distinctio sapiente rerum? Sint maxime amet neque dolore
        //                 corrupti voluptas impedit soluta? Ullam unde nobis
        //                 quaerat? Vero eligendi dolore placeat unde et, impedit
        //                 corporis ipsum aliquid accusantium magnam ullam labore
        //                 harum quae, amet atque a, nobis doloremque debitis?
        //                 Maxime ipsa excepturi optio molestias quod, qui totam
        //                 voluptas adipisci nisi, praesentium tempore sunt itaque
        //                 voluptatum vero. Maxime cupiditate a nostrum ipsum quo
        //                 aperiam sit id veritatis eius deleniti. Magnam earum
        //                 reprehenderit repellendus. Totam voluptatum ut deserunt
        //                 eum tempora minus sint, autem iure numquam atque, vero
        //                 eaque.
        //             </Tab>
        //             <Tab eventKey="profile" title="Profile">
        //                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
        //                 Veritatis in similique illo deserunt, impedit provident
        //                 amet. Magnam at eveniet quas porro, aliquid dolore nobis
        //                 laudantium voluptates asperiores vero perspiciatis,
        //                 repellendus, nam unde eaque dicta accusamus hic beatae
        //                 soluta. At eos aut harum soluta, atque aperiam alias
        //                 accusantium consequatur provident ratione consectetur
        //                 impedit recusandae sequi veritatis sunt eaque error
        //                 architecto vel labore delectus explicabo. Veritatis ad,
        //                 exercitationem voluptate excepturi vitae doloribus
        //                 voluptas natus ullam inventore minima quas mollitia
        //                 soluta ut libero? Neque impedit, consequatur odit omnis
        //                 dolore sit. Libero rerum beatae suscipit pariatur quo
        //                 aspernatur, corporis iusto fuga necessitatibus eius
        //                 harum.
        //             </Tab>
        //             <Tab eventKey="contact" title="Contact" disabled>
        //                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
        //                 Veritatis in similique illo deserunt, impedit provident
        //                 amet. Magnam at eveniet quas porro, aliquid dolore nobis
        //                 laudantium voluptates asperiores vero perspiciatis,
        //                 repellendus, nam unde eaque dicta accusamus hic beatae
        //                 soluta. At eos aut harum soluta, atque aperiam alias
        //                 accusantium consequatur provident ratione consectetur
        //                 impedit recusandae sequi veritatis sunt eaque error
        //                 architecto vel labore delectus explicabo. Veritatis ad,
        //                 exercitationem voluptate excepturi vitae doloribus
        //                 voluptas natus ullam inventore minima quas mollitia
        //                 soluta ut libero? Neque impedit, consequatur odit omnis
        //                 dolore sit. Libero rerum beatae suscipit pariatur quo
        //                 aspernatur, corporis iusto fuga necessitatibus eius
        //                 harum.
        //             </Tab>
        //         </Tabs>
        //     </div>
        // </Container>
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="section1" title="Section 1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                necessitatibus modi itaque est nemo, minus distinctio sapiente
                rerum? Sint maxime amet neque dolore corrupti voluptas impedit
                soluta? Ullam unde nobis quaerat? Vero eligendi dolore placeat
                unde et, impedit corporis ipsum aliquid accusantium magnam ullam
                labore harum quae, amet atque a, nobis doloremque debitis?
                Maxime ipsa excepturi optio molestias quod, qui totam voluptas
                adipisci nisi, praesentium tempore sunt itaque voluptatum vero.
                Maxime cupiditate a nostrum ipsum quo aperiam sit id veritatis
                eius deleniti. Magnam earum reprehenderit repellendus. Totam
                voluptatum ut deserunt eum tempora minus sint, autem iure
                numquam atque, vero eaque.
            </Tab>
            <Tab eventKey="section2" title="Section 2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis in similique illo deserunt, impedit provident amet.
                Magnam at eveniet quas porro, aliquid dolore nobis laudantium
                voluptates asperiores vero perspiciatis, repellendus, nam unde
                eaque dicta accusamus hic beatae soluta. At eos aut harum
                soluta, atque aperiam alias accusantium consequatur provident
                ratione consectetur impedit recusandae sequi veritatis sunt
                eaque error architecto vel labore delectus explicabo. Veritatis
                ad, exercitationem voluptate excepturi vitae doloribus voluptas
                natus ullam inventore minima quas mollitia soluta ut libero?
                Neque impedit, consequatur odit omnis dolore sit. Libero rerum
                beatae suscipit pariatur quo aspernatur, corporis iusto fuga
                necessitatibus eius harum.
            </Tab>
            <Tab eventKey="section3" title="Section 3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis in similique illo deserunt, impedit provident amet.
                Magnam at eveniet quas porro, aliquid dolore nobis laudantium
                voluptates asperiores vero perspiciatis, repellendus, nam unde
                eaque dicta accusamus hic beatae soluta. At eos aut harum
                soluta, atque aperiam alias accusantium consequatur provident
                ratione consectetur impedit recusandae sequi veritatis sunt
                eaque error architecto vel labore delectus explicabo. Veritatis
                ad, exercitationem voluptate excepturi vitae doloribus voluptas
                natus ullam inventore minima quas mollitia soluta ut libero?
                Neque impedit, consequatur odit omnis dolore sit. Libero rerum
                beatae suscipit pariatur quo aspernatur, corporis iusto fuga
                necessitatibus eius harum.
            </Tab>
        </Tabs>
    );
};

export default Rooms;
