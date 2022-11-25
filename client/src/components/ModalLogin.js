import { motion, AnimatePresence } from "framer-motion"
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Login from './Login'

const ModalLogin = forwardRef((props, ref) => {
    const [openLogin, setOpenLogin] = useState(false)
    
    useImperativeHandle(ref, () => {
        return {
            openLogin: () => setOpenLogin(true),
            closeLogin: () => setOpenLogin(false),
        }
    })

        
    return (
        <>

        <AnimatePresence>
           
            {openLogin &&

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
                        onClick={() => setOpenLogin(false)}
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
                                }
                            }}
                            onClick={(e) => {
                                if (e.currentTarget === e.target || e.target.id === "login-username" || e.target.id === "login-password") {
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
                                    }, 
                                }}
                               
                                className="modal-content">

                                <Login setUser={props.setUser} />

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

export default ModalLogin
