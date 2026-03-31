const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, skills } = user;
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Photo"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName }</h2>
          <h3> {age + ", " + gender}</h3>
          <p>{about}</p>
          <div className="card-actions flex flex-row gap-5 my-5">
            <button className="btn btn-primary p-3 w-50 bg-white text-black font-semibold">Interested</button>
            <button className="btn btn-primary p-3 w-50 font-semibold">Ignore</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
