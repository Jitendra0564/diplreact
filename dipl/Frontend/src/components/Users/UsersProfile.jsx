import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Common/Sidebar';
import { TbBriefcase } from 'react-icons/tb';
import { IoLocation } from 'react-icons/io5';
import { MdMarkEmailUnread } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import { FaSquarePhone } from "react-icons/fa6";
import { MdCastForEducation } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
import { FaLanguage } from "react-icons/fa6";
const UsersProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    const [photoUrl, setPhotoUrl] = useState(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const getFileUrlById = (fileId) => {
    return `${baseURL}/users/${userId}/files/${fileId}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = getCookieValue('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const userResponse = await axios.get(`${baseURL}/users/${userId}`,config);
      const filesResponse = await axios.get(`${baseURL}/users/${userId}/files`,config);
      setUser({ ...userResponse.data, files: filesResponse.data.files });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  
    fetchData();
  }, [userId]);
 

  useEffect(() => {
    const fetchPhoto = async () => {
      if (user && user.files) {
        const photoFile = user.files.find(file => file.metadata.fileCategory === 'photo');
        if (photoFile) {
          try {
            const token = getCookieValue('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: 'blob',
            };
            const response = await axios.get(getFileUrlById(photoFile._id), config);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            setPhotoUrl(url);
          } catch (error) {
            console.error('Error fetching photo:', error);
          }
        } else {
          setPhotoUrl(null);
        }
      }
    };

    fetchPhoto();
  }, [user, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user profile available</div>;
  }



 

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <main>
          <button
            onClick={() => navigate("/user")}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 p-4 mx-4 my-4"
          >
            Back
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="bg-gray-50 shadow-xl my-4 mx-4 border border-gray-300 rounded-lg">
              <div className="px-4 py-4 rounded-lg">
                {photoUrl ? (
                  <div>
                    <img
                      src={photoUrl}
                      alt="user photo"
                      className="h-40 w-40 object-cover rounded-md shadow-md"
                      onError={() => setPhotoUrl(null)}
                    />
                  </div>
                ) : (
                  <div>No photo available</div>
                )}
              </div>
              <div className="px-4 py-2">
                <h4 className="font-bold text-xl">{user.name}</h4>
                <div className="flex items-center pt-1 text-sm font-semibold text-gray-500">
                  <TbBriefcase className="text-gray-900" />
                  <p className="px-1">{user.Position}</p>
                </div>
                <div className="flex items-center pt-1 text-sm font-semibold text-gray-500">
                  <IoLocation className="text-gray-900" />
                  <p className="px-1">{user.Address}</p>
                </div>
                <div className="flex items-center pt-1 text-sm font-semibold text-gray-500">
                  <HiIdentification  className="text-gray-900" />
                  <p className="px-1">{user._id}</p>
                </div>
              </div>
              <div className="px-4 py-2">
                <h4 className="text-gray-500 font-semibold flex items-center">
                  <MdMarkEmailUnread className="text-gray-900 mr-2" /> Email
                  Address
                </h4>
                <p className="text-gray-900 text-sm font-semibold pt-1">
                  {user.email}
                </p>
              </div>

              <div className="px-4 py-2">
                <h4 className="text-gray-500 font-semibold flex items-center">
                <BsCalendarDateFill className="text-gray-900 mr-2"/>DOB:</h4>
                <p className="text-gray-900 text-sm font-semibold pt-1">
                  {formatDate(user.dob)}
                </p>
              </div>
              <div className="px-4 py-2">
                <h4 className="text-gray-500 font-semibold flex items-center">
                <FaAddressBook className="text-gray-900 mr-2"/>Home Address</h4>
                <p className="text-gray-900 text-sm font-semibold pt-1">
                  {user.Address}
                </p>
              </div>
              <div className="px-4 py-2">
                <h4 className="text-gray-500 font-semibold flex items-center">
                <FaSquarePhone className="text-gray-900 mr-2" />Phone no.</h4>
                <p className="text-gray-900 text-sm font-semibold pt-1">
                  {user.contactNo}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 grid grid-cols-1 sm:grid-cols-2 shadow-xl my-4 mx-4 border border-gray-300 rounded-lg">
              <div className="py-4">
                <div className="px-4 py-2">
                  <h4 className="font-bold text-md">General Info:</h4>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold flex items-center">
                  <MdCastForEducation className="text-gray-900 mr-2"/>Education</h4>
                  {user.Education && user.Education.length > 0 ? (
                    user.Education.map((education, index) => (
                      <div key={index} className="text-gray-900 text-sm  pt-1">
                        <p>
                          Degree:{" "}
                          <span className="font-semibold">
                            {education.degree}
                          </span>
                        </p>
                        <p>
                          Field of Study:{" "}
                          <span className="font-semibold">
                            {education.field_of_study}
                          </span>
                        </p>
                        <p>
                          University:{" "}
                          <span className="font-semibold">
                            {education.institution}
                          </span>
                        </p>
                        <p>
                          Start Date:{" "}
                          <span className="font-semibold">
                            {formatDate(education.start_date)}
                          </span>
                        </p>
                        <p>
                          End Date:{" "}
                          <span className="font-semibold">
                            {formatDate(education.end_date)}
                          </span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-900 text-sm font-semibold pt-1">
                      No Education history available
                    </p>
                  )}
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold flex items-center">
                  <BsFillCalendar2DateFill className="text-gray-900 mr-2"/>Join Date</h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {formatDate(user.joiningdate)}
                  </p>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold flex items-center">
                  <FcDepartment className="text-gray-900 mr-2"/>Department</h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.Department}
                  </p>
                </div>
              </div>
              <div className="py-4">
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold flex items-center">
                  <MdWorkHistory className="text-gray-900 mr-2"/>Work History:</h4>
                  {user.workHistory && user.workHistory.length > 0 ? (
                    user.workHistory.map((job, index) => (
                      <div key={index} className="text-gray-900 text-sm  pt-1">
                        <p>
                          Company:{" "}
                          <span className="font-semibold">{job.company}</span>
                        </p>
                        <p>
                          Job Title:{" "}
                          <span className="font-semibold">{job.job_title}</span>
                        </p>
                        <p>
                          Start Date:{" "}
                          <span className="font-semibold">
                            {formatDate(job.start_date)}
                          </span>
                        </p>
                        <p>
                          End Date:{" "}
                          <span className="font-semibold">
                            {formatDate(job.end_date)}
                          </span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-900 text-sm font-semibold pt-1">
                      No work history available
                    </p>
                  )}
                </div>

                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold flex items-center">
                  <FaLanguage className="text-gray-900 mr-2"/>Languages</h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.Language}
                  </p>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold">Role</h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.Role}
                  </p>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold">Status</h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.status}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 grid grid-cols-1 sm:grid-cols-2 shadow-xl my-4 mx-4 border border-gray-300 rounded-lg">
              <div className="py-4">
                <div className="px-4 py-2">
                  <h4 className="font-bold text-md">Document-Files:</h4>
                </div>
                {user.files && user.files.length > 0 ? (
                  user.files.map((file) => (
                    <div className="px-4 py-2" key={file._id}>
                      <h4 className="text-gray-500 font-semibold">
                        {file.metadata.fileCategory.charAt(0).toUpperCase() +
                          file.metadata.fileCategory.slice(1)}
                      </h4>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          const token = getCookieValue("token");
                          const config = {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                            responseType: "blob",
                          };
                          axios
                            .get(getFileUrlById(file._id), config)
                            .then((response) => {
                              const contentType =
                                response.headers["content-type"];
                              const blob = new Blob([response.data], {
                                type: contentType,
                              });
                              const url = window.URL.createObjectURL(blob);
                              const link = document.createElement("a");
                              link.href = url;

                              // Extract the file extension from the content type
                              const fileExtension = contentType.split("/")[1];
                              link.setAttribute(
                                "download",
                                `${file.metadata.fileCategory}.${fileExtension}`
                              );

                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                              window.URL.revokeObjectURL(url);
                            })
                            .catch((error) => {
                              console.error("Error downloading file:", error);
                            });
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View{" "}
                        {file.metadata.fileCategory.charAt(0).toUpperCase() +
                          file.metadata.fileCategory.slice(1)}
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    No files available
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 grid grid-cols-1 sm:grid-cols-2 shadow-xl my-4 mx-4 border border-gray-300 rounded-lg">
              <div className="py-4">
                <div className="px-4 py-2">
                  <h4 className="font-bold text-md">Bank & Family Details:</h4>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold">
                    Bank Account No.
                  </h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.BankAccNo}
                  </p>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold">IFSC code</h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.Ifsc}
                  </p>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold">Bank Name</h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.BankName}
                  </p>
                </div>
              </div>
              <div className="py-4">
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold">Father's Name</h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.fatherName}
                  </p>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold">
                    Father's Mobile No.
                  </h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.fatherNo}
                  </p>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold">Mother's Name</h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.motherName}
                  </p>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-gray-500 font-semibold">
                    Alternative Phone No.
                  </h4>
                  <p className="text-gray-900 text-sm font-semibold pt-1">
                    {user.AlternativeNo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UsersProfile;
