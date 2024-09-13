import React from 'react'
import Card from './Card';

const Restaurant = ({lists}) => {
    // console.log(list)
  return (
    <div>
      <div className="flex flex-wrap flex-row  font-poppins">
        {lists.map((restaurant) => {
          return (
            <div className=" w-[100vw]">
              <div className="font-medium text-xl mt-12 px-8">
                <h1 className="text-2xl ">
                  Restaurant:
                  <span className="text-[#fc6d19] ml-2 font-semibold">
                    {restaurant?.created_by?.name}
                  </span>
                </h1>{" "}
                <h1>
                  Order Version:{" "}
                  <span className="text-[#fc6d19]  font-semibold">
                    {restaurant.order_version}
                  </span>
                </h1>
              </div>
              <Card restaurant={restaurant}></Card>
            </div>
          );
        })}
        {/* hello */}
      </div>
    </div>
  );
}

export default Restaurant;