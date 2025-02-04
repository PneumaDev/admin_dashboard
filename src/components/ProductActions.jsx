import React, { useContext, useEffect, useState } from "react";
import { useColor } from "react-color-palette";
import "react-color-palette/css";
import Modal from "./Modal";
import AddProduct from "./AddProduct";
import { AdminContext } from "../context/AdminContext";

export default function ProductActions() {
  const [color, setColor] = useColor("#ffffff");

  const { openModal, setOpenModal, action, itemData, setItemData } =
    useContext(AdminContext);

  return (
    <>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={action === "edit" ? "Update Product" : "Add Product"}
      >
        <AddProduct
          formData={itemData}
          setFormData={setItemData}
          color={color}
          setColor={setColor}
          setParentModal={setOpenModal}
          action={action}
        />
      </Modal>
    </>
  );
}
