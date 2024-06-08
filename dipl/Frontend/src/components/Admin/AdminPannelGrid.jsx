import React from 'react'
import personalscore from "../../assets/personalscore.png"
import ptasks from "../../assets/ptask.png"
import ttasks from "../../assets/totaltask.png"
import umeetings from "../../assets/upcommingmettings.png"
import meeting from "../../assets/meetings.png"
import etask from "../../assets/etask.png"
import temployees from "../../assets/temployees.png"
import totalptask from "../../assets/totalptask.png"
import completedtask from "../../assets/completedtask.png"
import rtcomplition from "../../assets/rtcomplition.png"


const AdminPannelGrid = () => {
    return (
        <>







            <section className="py-20 bg-gray-300 h-full">
                <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        <ul className="space-y-8">
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg  ring-1 bg-white shadow-lg hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={ttasks}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-black">Total Tasks</h3>
                                                        <p className="text-gray-500 text-md">Admin &amp; Employee</p>
                                                    </div>
                                                </div>

                                                <h4 className=" text-gray-500 font-bold text-xl">5</h4>


                                            </div>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"><img
                                                src={personalscore}
                                                clasName="w-15 h-12 bg-center bg-cover " alt="Score" />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-black">personal score</h3>
                                                    <p className="text-gray-500 text-md">Admin Score</p>
                                                </div>
                                            </div>


                                            <h1 className=" text-gray-900 font-bold text-8xl text-center ">99<span className="text-sm font-bold">%</span></h1>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={ptasks}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-black">Panding Tasks</h3>
                                                        <p className="text-gray-500 text-md"> Employee</p>
                                                    </div>
                                                </div>

                                                <h4 className=" text-gray-500 font-bold text-xl">5</h4>


                                            </div>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-white shadow-lg ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"><img
                                                src={umeetings}
                                                clasName="w-15 h-12 bg-center bg-cover " alt="Score" />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-black">Upcomming Meetings</h3>
                                                    <p className="text-gray-500 text-md">Your Meetings</p>
                                                </div>
                                            </div>


                                            <h1 className=" text-gray-900 font-bold text-8xl text-center ">8<span className="text-sm font-bold">-Only</span></h1>

                                        </div>
                                    </a>
                                </div>
                            </li>
                        </ul>


                        <ul className="hidden space-y-8 sm:block">
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={meeting}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-balck">Total Meetings</h3>
                                                        <p className="text-gray-500 text-md">Held Meetings</p>
                                                    </div>
                                                </div>

                                                <h4 className=" text-gray-500 font-bold text-xl">10</h4>


                                            </div>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={etask}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-dark">Expired Tasks</h3>
                                                        <p className="text-gray-500 text-md"> Employee</p>
                                                    </div>
                                                </div>

                                                <h4 className=" text-gray-500 font-bold text-xl">21</h4>


                                            </div>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"><img
                                                src={temployees}
                                                clasName="w-15 h-12 bg-center bg-cover " alt="Score" />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-dark">Total Employees</h3>
                                                    <p className="text-gray-500 text-md">Employee number-</p>
                                                </div>
                                            </div>


                                            <h1 className=" text-gray-900 font-bold text-8xl text-center ">120<span className="text-sm font-bold">-Only</span></h1>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={totalptask}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-black">Total Panding Tasks</h3>
                                                        <p className="text-gray-500 text-md"> Employee</p>
                                                    </div>
                                                </div>

                                                <h4 className=" text-gray-500 font-bold text-xl">21</h4>


                                            </div>

                                        </div>
                                    </a>
                                </div>
                            </li>
                        </ul>


                        <ul className="hidden space-y-8 lg:block">
                            <li className="text-sm leading-6">
                                <div class="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white hover:bg-gray-100 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"><img
                                                src={rtcomplition}
                                                clasName="w-15 h-12 bg-center bg-cover " alt="Score" />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-black">Rate Of Task complition</h3>
                                                    <p className="text-gray-500 text-md">Complition Rate</p>
                                                </div>
                                            </div>


                                            <h1 className=" text-gray-900 font-bold text-8xl text-center ">95<span className="text-sm font-bold">%</span></h1>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white  hover:bg-gray-100 ring-1 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={completedtask}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-black">Total completed Tasks</h3>
                                                        <p className="text-gray-500 text-md"> Employee</p>
                                                    </div>
                                                </div>

                                                <h4 className=" text-gray-500 font-bold text-xl">22</h4>


                                            </div>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white hover:bg-gray-100 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"><img
                                                src={temployees}
                                                clasName="w-15 h-12 bg-center bg-cover " alt="Score" />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-black">Toltal Companies</h3>
                                                    <p className="text-gray-500 text-md">Companies</p>
                                                </div>
                                            </div>


                                            <h1 className=" text-gray-900 font-bold text-8xl text-center ">12<span className="text-sm font-bold">-Only</span></h1>

                                        </div>
                                    </a>
                                </div>
                            </li>
                        </ul>


                    </div>
                </div>
            </section>











        </>
    )
}

export default AdminPannelGrid
