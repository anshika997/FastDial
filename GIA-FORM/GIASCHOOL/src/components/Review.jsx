import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Loading from "./Loading";
const Review = ({ topic_id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [average, setAverage] = useState(null);
  const [currRev, setCurrRev] = useState(null);
  const [newRev, setNewRev] = useState({
    user_name: "",
    user_id: "",
    rating: "",
    review_comment: "",
    topic_id: "",
  });
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const { isAuthenticated, userPhone } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const getReviews = async () => {
    if (!topic_id) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/data/getreviews?topic_id=${topic_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const reviewsData = response.data;

      // Check if the logged-in user has already reviewed
      if (reviewsData.some((item) => item.user_id === userPhone.user.empid)) {
        setFound(true);
      } else {
        setFound(false);
      }

      // Calculate the average rating
      const totalRating = reviewsData.reduce((sum, review) => sum + parseFloat(review.rating), 0);
      const avg = reviewsData.length > 0 ? totalRating / reviewsData.length : null;

      setReviews(reviewsData);
      setAverage(avg); // Update the average rating
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete the review?"
    );
    if(!userConfirmed)
    {
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`${BASEURL}/data/deletereviews/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Remove the deleted review from the state
      const updatedReviews = reviews.filter((review) => review.id !== id);
      setReviews(updatedReviews);

      // Recalculate the average rating
      const totalRating = updatedReviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
      const avg = updatedReviews.length > 0 ? totalRating / updatedReviews.length : null;
      setAverage(avg);

      setFound(false);
      alert("Review deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete review");
    } finally {
      setShowModal(false);
      setShow(false);
      setLoading(false);
    }
  };

  const handleUpdateReview = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to update the review?"
    );
    if(!userConfirmed)
    {
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${BASEURL}/data/updatereviews`, currRev, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Update the reviews state with the updated review
      const updatedReviews = reviews.map((review) =>
        review.id === currRev.id ? { ...review, ...currRev } : review
      );
      setReviews(updatedReviews);

      // Recalculate the average rating
      const totalRating = updatedReviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
      const avg = updatedReviews.length > 0 ? totalRating / updatedReviews.length : null;
      setAverage(avg);

      alert("Review updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update review");
    } finally {
      setShowModal(false);
      setShow(false);
      setLoading(false);
    }
  };


  const handleUpdate = (data) => {
    console.log("Update");
    setCurrRev(data);
    setShowModal(true);
  }



  useEffect(() => {
    getReviews();
  }, [topic_id])

  const handleRev = (event, val) => {
    setNewRev((prev) => ({
      ...prev,
      rating: val,
    }));
  };

  const handleChange = (e) => {
    setNewRev((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to submit the review?"
    );
    if(!userConfirmed)
    {
      return;
    }
    if (!newRev.rating || newRev.rating === 0) {
      alert("Please provide a rating");
      return;
    }
    if (!newRev.review_comment || newRev.review_comment.trim().length === 0) {
      alert("Please provide a review");
      return;
    }
    setLoading(true);
    const PostData = {
      user_name: userPhone.user.name,
      user_id: userPhone.user.empid,
      rating: newRev.rating,
      review_comment: newRev.review_comment,
      topic_id: topic_id,
    };
    try {
      const response = await axios.post(`${BASEURL}/data/insertreviews`, PostData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const newReview = response.data.data;

      // Update reviews state
      setReviews((prev) => [...prev, newReview]);

      // Update the average rating
      setAverage((prevAverage) => {
        const totalReviews = reviews.length + 1; // Including the new review
        const totalRating = prevAverage * reviews.length + parseFloat(newReview.rating);
        return totalRating / totalReviews;
      });

      setFound(true);
      alert("Review created successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to create review");
    } finally {
      setLoading(false);
    }
  };





  return (
    <>
      <div className="space-y-6 bg-white shadow-lg rounded-lg px-5 py-6 my-5">
        <div className="flex items-center gap-4 ">
          <span className="font-bold text-gray-800 text-2xl ">
            Overall Rating :-
          </span>
          <Rating
            name={`rating`}
            value={average}
            readOnly
            size="large"
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <span className="font-bold text-gray-800 text-2xl">
            {average}/5
          </span>
        </div>
      </div>

      {/* Display Existing Reviews */}
      <div className="bg-white shadow-lg rounded-lg px-5 py-6 my-5 max-h-1/3 overflow-auto">
        <span className="font-bold text-gray-800 text-2xl block mb-3">
          Reviews :-
        </span>
        {reviews && reviews.length > 0 ? (
          reviews.map((data, index) => (
            <div
              key={index}
              className="flex flex-col mb-6 bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center">

                <span className="font-bold block text-gray-800 text-sm mb-2">
                  Name :-  {data.user_name}
                </span>

                {data.user_id === userPhone.user.empid && (
                  !show ? (
                    <BsThreeDotsVertical
                      className="text-lg cursor-pointer"
                      onClick={() => setShow(true)}
                    />
                  ) : (
                    <IoMdClose
                      className="text-lg cursor-pointer"
                      onClick={() => setShow(false)}
                    />
                  )
                )}

              </div>
              {show && data.user_id === userPhone.user.empid && (
                <div className="absolute  right-20  mt-7 w-40 bg-gray-50 border border-gray-300 rounded shadow-lg flex flex-col">
                  <button
                    onClick={() => { handleUpdate(data) }}
                    className="px-4 py-2 text-left bg-gray-100 hover:bg-gray-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => { handleDelete(data.id) }}
                    className="px-4 py-2 text-left bg-gray-100 hover:bg-gray-200"
                  >
                    Delete
                  </button>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-800 text-sm">
                  Rating :-
                </span>
                <Rating
                  name={`rating-${index}`}
                  value={parseFloat(data.rating)}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>

              <span className="font-bold text-gray-800 text-sm mt-2">
                Review :- {data.review_comment}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No reviews available yet.</p>
        )}
      </div>

      {/* New Review Form */}
      {!found && <div className="space-y-6 bg-white shadow-lg rounded-lg px-5 py-6">
        {/* Rating */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <span className="font-bold text-gray-800 text-lg">
            Rate this course:
          </span>
          <Rating
            name="size-large"
            defaultValue={0}
            size="large"
            onChange={handleRev}
          />
        </div>

        {/* Review Comment */}
        <div className="flex flex-col gap-2">
          <span className="font-bold text-gray-800 text-lg">
            Write a review:
          </span>
          <textarea
            rows={4}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-transform duration-300"
            name="review_comment"
            placeholder="Write your review here..."
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-start">
          <button
            className="bg-green-500 text-white text-lg px-6 py-2 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-transform duration-300"
            onClick={handleSubmit}
          >
            Post Review
          </button>
        </div>
      </div>}
      {showModal && <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
        <div className='container mx-auto p-6 bg-white'>
          <h1 className="text-2xl font-Montserrat text-center font-bold mb-8 bg-blue-600 text-white py-3 rounded-lg shadow-lg">
            Update Review
          </h1>
          <div className="space-y-6 bg-white rounded-lg px-5 py-6">
            {/* Rating */}
            <div className="flex flex-col gap-4">
              {/* Name Section */}
              <div className="flex items-center gap-2 w-full">
                <span className="font-bold text-gray-800 text-lg">Name :-</span>
                <span className="text-gray-600 text-lg">
                  {currRev.user_name ? currRev.user_name : "Anonym"}
                </span>
              </div>

              {/* Rating Section */}
              <div className="flex items-center gap-2 w-full">
                <span className="font-bold text-gray-800 text-lg">Rating:</span>
                <Rating
                  name="size-large"
                  defaultValue={currRev.rating}
                  size="large"
                  onChange={(e, val) => {
                    setCurrRev((prev) => ({
                      ...prev,
                      rating: val,
                    }));
                  }}
                />
              </div>
            </div>


            {/* Review Comment */}
            <div className="flex flex-col gap-2">

              <span className="font-bold text-gray-800 text-lg block">
                Write a review:
              </span>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-transform duration-300"
                name="review_comment"
                value={currRev.review_comment}
                onChange={(e) => {
                  setCurrRev((prev) => ({
                    ...prev,
                    review_comment: e.target.value
                  }))
                }}
              ></textarea>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <button className="bg-[#0455BF] text-white p-2 rounded-md hover:scale-105 transition-transform duration-300 " onClick={handleUpdateReview}>
              Update
            </button>
            <button className="bg-[#D70040] text-white p-2 rounded-md hover:scale-105 transition-transform duration-300 " onClick={() => { setShowModal(false); setShow(false) }}>
              Cancel
            </button>
          </div>
        </div>
      </div>}
      {loading && <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>


        <Loading />

      </div>}
    </>
  );
};

export default Review;
