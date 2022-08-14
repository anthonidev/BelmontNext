import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { ListClient } from "../../utils/types/interfaces";
import { XIcon } from "@heroicons/react/solid";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { get_ItemsListClient } from "../../redux/api/campaign";
type Props = {
  item: ListClient;
};

const ModalClientList = ({ item }: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  const { id, created_at, slug, title, description, status, updated_at } = item;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    isOpen && dispatch(get_ItemsListClient(slug));
  }, [dispatch, slug, isOpen]);

  const { count, next, previous, results } = useSelector(
    (state: RootState) => state.camapaign.list_items
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        onClick={openModal}
        className=" block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
        key={id}
      >
        <div className="flex justify-between">
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </p>
          <span className={`${status ? "text-green-500" : "text-red-500"}`}>
            {status ? "Activo" : "Inactivo"}
          </span>
        </div>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          {" "}
          {description}
        </p>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full  p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full md:w-1/2 transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 text-gray-200 font-bold"
                    >
                      {title}
                    </Dialog.Title>
                    <button
                      onClick={closeModal}
                      className=" focus:outline-none "
                    >
                      <XIcon className="text-gray-200 h-5 w-5 hover:text-red-400 " />
                    </button>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="py-3 px-6">
                            name
                          </th>
                          <th scope="col" className="py-3 px-6">
                            lastname
                          </th>
                          <th scope="col" className="py-3 px-6">
                            email
                          </th>
                          <th scope="col" className="py-3 px-6">
                            phone
                          </th>
                          <th scope="col" className="py-3 px-6">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results?.map(
                          ({
                            client: { email, name, id, phone, lastname },
                          }) => {
                            return (
                              <tr
                                key={id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <th
                                  scope="row"
                                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {name}
                                </th>
                                <td className="py-4 px-6">{lastname}</td>
                                <td className="py-4 px-6">{email}</td>
                                <td className="py-4 px-6">{phone}</td>
                                <td className="py-4 px-6 text-right">
                                  <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  >
                                    Edit
                                  </a>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalClientList;
