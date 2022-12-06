import { motion, AnimatePresence } from "framer-motion"
import { useState, forwardRef, useImperativeHandle } from 'react'
import LeaderBoard from "./LeaderBoard"
import topScoresPic from "../images/top-scores3.png"

const ModalLeaderboard = forwardRef((props, ref) => {
    const [openLead, setOpenLead] = useState(false)

    useImperativeHandle(ref, () => {
        return {
            openLeaderboard: () => setOpenLead(true),
            closeLeaderboard: () => setOpenLead(false),
        }
    })

    return (
        <>

            <AnimatePresence>
                {openLead &&

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
                            onClick={() => setOpenLead(false)}
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
                                    if (e.currentTarget === e.target || e.target.className === "modal-content-wrapper" || e.target.className === "modal-content" || e.target.className === "leaderboard-rank" || e.target.className === "leader-modal-content" || e.target.className === "leaderboard-item" || e.target.className === "leaderboard-small-text") {
                                        e.stopPropagation()
                                    }


                                }}

                


                                className="modal-content-wrapper">
                                <img className="modal-pic" src={topScoresPic} />
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

                                    className="leader-modal-content">


                                    <LeaderBoard />

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

export default ModalLeaderboard