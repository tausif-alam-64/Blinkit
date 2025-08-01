import swal from "sweetalert";

const successAlert = (title) => {
  return swal({
    title: title,
    icon: "success",
    button: "OK",
  });
};

export default successAlert;