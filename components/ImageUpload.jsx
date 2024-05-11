function ImageUpload({
  ComponentId,
  labelTitle,
  placeHolder,
  type,
  handleImageChange,
}) {
  return (
    <div className="my-2">
      <label htmlFor={`${ComponentId}`} className="text-sm">
        {labelTitle}
      </label>
      <input
        id={`${ComponentId}`}
        className="file:border-0 file:-ml-7 file:mr-6 file:font-semibold w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type={`${type}`}
        placeholder={`${placeHolder}`}
        accept="image/*"
        onChange={handleImageChange}

        // value={ref.current.value}

        // aria-invalid={errors.email ? "true" : "false"}
      />
    </div>
  );
}

export default ImageUpload;
