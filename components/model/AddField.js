import Image from "next/image";
import React, { useState } from "react";
import { useMqtt } from "../../context/MqttProvider";
import { f2 as ff } from "../../styles/variables.module.scss";
import ListItem from "../ListItem";
import ToggleSwitch from "../ToggleSwitch";
import { fieldTypes } from "../../utils/fieldImages";
export default function AddField({ closeModel, selectedItem, onSubmit }) {
  const [field, setField] = useState({
    field_type_id: 0,
    addr: "",
    gateway: selectedItem?.gateway,
    node: selectedItem?.node,
    min_moist: 0,
    max_moist: 0,
    min_temp: 0,
    max_temp: 0,
    moist_auto: false,
    temp_auto: false,
  });

  const onChange = ({ target: { name, value, checked } }) => {
    setField((currentValue) => ({
      ...currentValue,
      [name]: name == "moist_auto" ? checked : value,
    }));
  };
  return (
    <div className="z-[101] min-h-screen fixed w-full flex justify-center items-center bg-custom-transparent_back">
      <div className="  bg-custom-light shadow-lg border border-1 border-custom-p4 min-h-min sm:min-w-[350px] min-w-full">
        <div className="relative bg-custom-primary h-14 shadow-lg flex justify-center items-center ">
          <label
            className="text-custom-light font-normal text-xl p-0 m-0"
            style={{ fontFamily: ff }}
          >
            Add New Field
          </label>
          <div
            onClick={() => closeModel(false)}
            className="rounded absolute w-8 h-8 right-2 shadow-md cursor-pointer transition-all p-2 bg-[#ee0c0cd8] m-0 hover:bg-custom-p6 active:bg-custom-p6"
          >
            <Image
              src={require("../../public/images/close_1.png")}
              objectFit="cover"
            />
          </div>
        </div>
        <div className={`flex flex-col overflow-y-scroll min-h-[450px]`}>
          <div
            className="py-2 flex flex-col items-center overflow-scroll h-full"
            // style={{ height: "400px" }}
          >
            <div
              className="flex flex-col w-5/6 mb-2"
              style={{ fontFamily: ff }}
            >
              <label
                className="m-0 font-semibold text-base text-[#555]"
                htmlFor="type"
                style={{ fontFamily: ff }}
              >
                Field Type
              </label>
              <select
                value={field?.field_type_id}
                id="field_type_id"
                name="field_type_id"
                style={{ fontFamily: ff }}
                className="p-1 rounded shadow-sm"
                onChange={onChange}
              >
                {fieldTypes.map((type, i) => (
                  <option key={i} value={type?.id}>
                    {type?.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="flex flex-col w-5/6 mb-2"
              style={{ fontFamily: ff }}
            >
              <label
                className="m-0 font-semibold text-base text-[#555]"
                htmlFor="addr"
                style={{ fontFamily: ff }}
              >
                Location
              </label>
              <input
                id="addr"
                name="addr"
                value={field?.addr}
                className="p-1 rounded shadow-sm"
                placeholder="field location"
                onChange={onChange}
              />
            </div>

            <div
              className="py-2 shadow-inner px-2 flex flex-col w-5/6 mb-2 mt-3 border-[1px]  border-[#ddd]"
              style={{ fontFamily: ff }}
            >
              <label
                className="m-0 font-semibold text-base text-[#555]"
                style={{ fontFamily: ff }}
              >
                Moisture Sensor Threshold Values
              </label>
              <div className="flex w-full">
                <div
                  className="flex flex-col w-1/2  mb-2"
                  style={{ fontFamily: ff }}
                >
                  <label
                    className="m-0 font-semibold text-sm text-[#666]"
                    htmlFor="min_moist"
                    style={{ fontFamily: ff }}
                  >
                    Min %
                  </label>
                  <input
                    id="min_moist"
                    name="min_moist"
                    value={field?.min_moist}
                    className="p-1 rounded shadow-sm w-1/2"
                    placeholder="min"
                    onChange={onChange}
                    type={"number"}
                  />
                </div>
                <div
                  className="flex flex-col w-1/2 mb-2"
                  style={{ fontFamily: ff }}
                >
                  <label
                    className="m-0 font-semibold text-sm text-[#666]"
                    htmlFor="max_moist"
                    style={{ fontFamily: ff }}
                  >
                    Max %
                  </label>
                  <input
                    type={"number"}
                    value={field?.max_moist}
                    id="max_moist"
                    name="max_moist"
                    className="p-1 rounded shadow-sm w-1/2"
                    placeholder="max"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="flex mt-3">
                <div className="flex">
                  <ToggleSwitch
                    label="moist_auto"
                    checked={field?.moist_auto}
                    onChange={onChange}
                  />
                </div>
                <label
                  className="m-0 p-0 ml-2 max-w-md"
                  style={{ lineHeight: 1, fontFamily: ff }}
                >
                  Press to adjust the automatic sprinkler state based on the
                  minimum and maximum moisture sensor threshold values.
                </label>
              </div>
            </div>
            <div className="flex w-5/6 mt-2">
              <div
                onClick={() => onSubmit(field)}
                className="text-custom-white bg-custom-primary p-2 px-4 rounded-md  cursor-pointer hover:bg-custom-purple"
              >
                <label className="m-0 font-semibold" style={{ fontFamily: ff }}>
                  Add
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}