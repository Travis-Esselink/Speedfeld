import { motion, AnimatePresence } from "framer-motion"
import { useState, forwardRef, useImperativeHandle } from 'react'
import UserProfile from "./UserProfile"

const ModalProfile = forwardRef((props, ref) => {
    const [openProf, setOpenProf] = useState(false)

   

    useImperativeHandle(ref, () => {
        return {
            openProfile: () => setOpenProf(true)
            ,
            closeProfile: () => setOpenProf(false),
        }
    })


    return (
        <>

            <AnimatePresence>
                {openProf &&

                    <>

                        <motion.div
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.3
                                }
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    delay: 0.3
                                }
                            }}
                            onClick={() => setOpenProf(false)}
                            className="modal-backdrop">

                            <motion.div
                                initial={{
                                    scale: 0
                                }}
                                animate={{
                                    scale: 1,
                                    transition: {
                                        duration: 0.3
                                    }
                                }}
                                exit={{
                                    scale: 0,
                                    transition: {
                                        delay: 0.3
                                    },
                                }}
                                onClick={(e) => {
                                    if (e.currentTarget === e.target || e.target.className === "modal-content-wrapper" || e.target.className === "modal-content" || e.target.className === "stats-container" || e.target.className === "stats") {
                                        e.stopPropagation()
                                    } 
                            
                                    
                                }}

                                
                                className="modal-content-wrapper">

                                <motion.div
                                    initial={{
                                        x: 100,
                                        opacity: 0
                                    }}
                                    animate={{
                                        x: 0,
                                        opacity: 1,
                                        transition: {
                                            delay: 0.3,
                                            duration: 0.3
                                        }
                                    }}
                                    exit={{
                                        x: 100,
                                        opacity: 0,
                                        transition: {
                                            duration: 0.3
                                        }

                                    }}
                                    className="modal-content">

                                    <UserProfile user={props.user} userFetched={props.user} tests={props.tests} setTests={props.setTests}/>

                                </motion.div>

                            </motion.div>

                        </motion.div>
                    </>
                }
            </AnimatePresence>

        </>
    )
}
)

export default ModalProfile