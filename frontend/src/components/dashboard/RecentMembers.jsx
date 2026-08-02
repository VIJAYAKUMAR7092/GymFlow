import gym1 from "../../assets/images/gym1.jpg";

export default function RecentMembers() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Members
      </h2>

      {[1,2,3].map((item)=>(
        <div
          key={item}
          className="flex items-center gap-4 mb-5"
        >

          <img
            src={gym1}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>

            <h3 className="font-semibold">
              Member {item}
            </h3>

            <p className="text-gray-500">
              Monthly Plan
            </p>

          </div>

        </div>
      ))}

    </div>
  );
}