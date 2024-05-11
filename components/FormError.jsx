function FormError({ ErrorImg, children }) {
  return (
    <small className="flex items-center justify-start text-red-500 gap-x-2 font-medium text-sm">
      <ErrorImg />
      {children}
    </small>
  );
}

export default FormError;
