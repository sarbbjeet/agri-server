import Image from "next/image";
import React from "react";
import colors from "tailwindcss/colors";
import { useMqtt } from "../context/MqttProvider";
import { f2 as ff } from "../styles/variables.module.scss";
import { fieldTypes } from "../utils/fieldImages";
import LoadingSpinner from "./LoadingSpinner";
import Relay from "./Relay";
import RoundIndicator from "./RoundIndicator";

export default function Field({
  fId = 0,
  loading,
  addr = "7 tennyson street",
  data = {
    sensor0: 0,
    sensor1: 0,
    relay0: 0,
  },
  moist_auto = false,
  onDelete,
  onEdit,
  sprinklerEvent,
}) {
  return (
    <div
      style={{ height: "510px" }}
      className={`border-custom-p4 rounded-t-2xl shadow bg-custom-p2 m-2 relative`}
    >
      {loading && (
        <LoadingSpinner className="absolute top-0 z-20 flex justify-center w-full h-full items-center bg-[rgba(0,0,0,0.6)]" />
      )}
      <div className="relative">
        <Image
          className="rounded-t-xl"
          alt="Picture of the field"
          objectFit="cover"
          width={400}
          height={150}
          src={fieldTypes.find((field) => field.id == fId).image}
        />
        <div className="absolute z-30 top-1 right-1 flex">
          <span
            onClick={onDelete}
            className=" p-2 bg-custom-p1 rounded-l-sm hover:bg-custom-p3 transition-colors cursor-pointer"
          >
            <i className="fas fa-trash  hover:text-custom-p6 transition-colors cursor-pointer"></i>
          </span>
          <div className="w-[2px] bg-custom-p3"></div>
          <span
            onClick={onEdit}
            className="p-2 bg-custom-p1 rounded-r-sm hover:bg-custom-p3 transition-colors cursor-pointer"
          >
            <i className="fas fa-edit hover:text-custom-p6 transition-colors cursor-pointer"></i>
          </span>
        </div>
      </div>
      <div className="px-2">
        <div
          className="text-xl text-custom-p4 font-bold capitalize"
          style={{ fontFamily: ff, lineHeight: 1 }}
        >
          {fieldTypes.find((field) => field.id == fId).name}
        </div>
        <div
          style={{ fontFamily: ff, lineHeight: 1 }}
          className="text-base text-custom-p4 font-normal"
        >
          {addr.length > 35 ? `${addr.slice(0, 35)} ...` : addr}
        </div>
        <div className="flex mt-2">
          <RoundIndicator value={data?.sensor0.toFixed(2)} />
          <div className="w-2"></div>
          <RoundIndicator
            title="Soil Moisture"
            isFloatValue={false}
            valueSuffix="%"
            minValue={0}
            value={data?.sensor1.toFixed(0)}
          />
        </div>
        <div className="mt-2">
          <Relay
            disabled={moist_auto} //Is moist auto on?
            power={data?.relay0}
            onClick={() => sprinklerEvent(!data?.relay0)}
          />
        </div>
      </div>
    </div>
  );
}
