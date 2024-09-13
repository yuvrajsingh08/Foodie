import React from 'react'

const Card = ({ restaurant }) => {
  return <div className='flex flex-wrap justify-start items-start'>
    {restaurant?.items.map((item) => {
    return (
      <div
        key={item._id}
        className=" overflow-hidden shadow-xl bg-[#6f6f6f21] h-[460px] w-[350px] ml-6 mt-6 rounded-xl   flex flex-col justify-between "
      >
        <div className="object-cover overflow-hidden xl:h-[60%] md:h-[400px] rounded-t-2xl mx-auto">
          <img
            className="object-[0px_-100px] "
            src={item.menu_item.imageId}
            alt={item.menu_item.nameID}
          />
        </div>
        <div className=" text-black px-4 mb-[10%] text-lg">
          <h1 className="text-3xl py-2 ">{item.menu_item.name}</h1>
          <div className="flex justify-between ">
            <p>
              <span>PRICE:</span>
              <span className="font-semibold"> {item.menu_item.price}</span>
            </p>
            <p>
              <span>QUANTITY:</span>
              <span className="font-semibold"> {item.quantity}</span>
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="inline-block">
              <p>
                <span>STATUS:</span>
                <span className="font-semibold"> {restaurant.status}</span>
              </p>
              <span>Payment: </span>
              {restaurant.is_cash ? (
                <span className="font-semibold">Cash</span>
              ) : (
                <span className="font-semibold">Card</span>
              )}
            </div>
            <div>
              {item.menu_item.is_veg ? (
                <p className="text-green-500 font-roboto text-2xl">Veg</p>
              ) : (
                <p className="text-red-600  font-roboto text-2xl">Non-Veg</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  })}</div>;
};

export default Card
