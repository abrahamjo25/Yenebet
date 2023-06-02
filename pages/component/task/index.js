import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
const index = () => {
    return (
        <>
            <div className="col-12">
                <div className="card">
                    <Header />
                    <div className="col-12 md:col-6">
                        <div className="card">
                            <h5>
                                <span style={{ color: '#6366F1' }}> Today's tips </span>
                                <span className="text-400">- Read and Complete to 💰Earn</span>{' '}
                            </h5>
                            <Accordion activeIndex={0}>
                                <AccordionTab header="Tip 1  Removing Atletes foot Problem">
                                    {/* <p style={{ color: '#22C55E' }}>Read and press complete button to get Bonus!</p> */}
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                        mollit anim id est laborum.
                                    </p>
                                    <div className="flex align-items-center justify-content-between">
                                        <Button label="Complete" icon="" style={{ marginRight: '.5em' }} />
                                        <span className="font-medium text-lg" style={{ color: '#22C55E' }}>
                                            50 ETB
                                        </span>
                                    </div>
                                </AccordionTab>
                                <AccordionTab header="Tip 2 ">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                        mollit anim id est laborum.
                                    </p>
                                    <div className="flex align-items-center justify-content-between">
                                        <Button label="Complete" icon="" style={{ marginRight: '.5em' }} />
                                        <span className="font-medium text-lg" style={{ color: '#22C55E' }}>
                                            50 ETB
                                        </span>
                                    </div>
                                </AccordionTab>
                                <AccordionTab header="Tip 3">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                        mollit anim id est laborum.
                                    </p>
                                    <div className="flex align-items-center justify-content-between">
                                        <Button label="Complete" icon="" style={{ marginRight: '.5em' }} />
                                        <span className="font-medium text-lg" style={{ color: '#22C55E' }}>
                                            50 ETB
                                        </span>
                                    </div>
                                </AccordionTab>
                            </Accordion>
                        </div>
                    </div>
                    <hr />
                    <div className="py-5">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

index.getLayout = function getLayout(page) {
    return <React.Fragment>{page}</React.Fragment>;
};

export default index;
