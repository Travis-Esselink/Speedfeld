import { motion, AnimatePresence } from "framer-motion"
import { useState, forwardRef, useImperativeHandle } from 'react'
import Register from './Register'

const ModalReg = forwardRef((props, ref) => {
    const [openReg, setOpenReg] = useState(false)

    useImperativeHandle(ref, () => {
        return {
            openRegister: () => setOpenReg(true),
            closeRegister: () => setOpenReg(false),
        }
    })

    return (
        <>

            <AnimatePresence>
                {openReg &&

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
                            onClick={() => setOpenReg(false)}
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
                                    if (e.currentTarget === e.target || e.target.id === "register-username" || e.target.id ===  "register-password" || e.target.id === "register-confirm-password") {
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

                                    <Register user={props.user} setUser={props.setUser} />

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

export default ModalReg
