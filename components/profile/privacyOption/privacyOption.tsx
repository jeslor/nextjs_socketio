"use client";

const PrivacyOption = () => {
  return (
    <div className="flex items-center  px-2">
      <input type="checkbox" className="toggle toggle-md" />
      <label className="ml-2" htmlFor="public">
        Hide my profile photo
      </label>
    </div>
  );
};

export default PrivacyOption;
