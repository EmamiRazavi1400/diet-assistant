"use client";

import { useState } from "react";

export default function DietForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    mealsPerDay: "",
    dietType: "",
    favoriteFoods: [] as string[],
    physicalActivity: "",
    sleepHours: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let newFoods = [...formData.favoriteFoods];
      if (checked) {
        newFoods.push(value);
      } else {
        newFoods = newFoods.filter((food) => food !== value);
      }
      setFormData({ ...formData, favoriteFoods: newFoods });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    // اینجا لینک فرم اسپری یا هر سرویس دیگری که داری بذار
    await fetch("https://formspree.io/f/xanbyrpb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">✅ ارسال شد!</h2>
        <p>از ثبت اطلاعات شما متشکریم 🙏</p>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto p-6 shadow rounded-xl mt-10 bg-white font-sans">
      {step === 1 && (
        <>
          <h2 className="text-xl font-bold mb-6">اطلاعات شخصی</h2>
          <input
            className="input"
            placeholder="نام و نام خانوادگی"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="input"
            placeholder="سن"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
          <select
            className="input"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">جنسیت</option>
            <option value="مرد">مرد</option>
            <option value="زن">زن</option>
            <option value="سایر">سایر</option>
          </select>
          <input
            className="input"
            placeholder="وزن (کیلوگرم)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
          />
          <button className="btn mt-4" onClick={handleNext}>
            مرحله بعدی ➡️
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-bold mb-6">عادات غذایی</h2>
          <select
            className="input"
            name="mealsPerDay"
            value={formData.mealsPerDay}
            onChange={handleChange}
          >
            <option value="">تعداد وعده غذایی در روز</option>
            <option value="1">1 وعده</option>
            <option value="2">2 وعده</option>
            <option value="3">3 وعده</option>
            <option value="4+">4 یا بیشتر</option>
          </select>

          <select
            className="input"
            name="dietType"
            value={formData.dietType}
            onChange={handleChange}
          >
            <option value="">نوع رژیم غذایی</option>
            <option value="عادی">عادی</option>
            <option value="گیاهخواری">گیاهخواری</option>
            <option value="وگان">وگان</option>
            <option value="کاهش وزن">کاهش وزن</option>
            <option value="افزایش وزن">افزایش وزن</option>
          </select>

          <div className="mb-4">
            <p className="mb-2 font-semibold">غذاهای مورد علاقه (چند گزینه‌ای)</p>
            <label className="block">
              <input
                type="checkbox"
                name="favoriteFoods"
                value="گوشت"
                onChange={handleChange}
                checked={formData.favoriteFoods.includes("گوشت")}
              />{" "}
              گوشت
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="favoriteFoods"
                value="سبزیجات"
                onChange={handleChange}
                checked={formData.favoriteFoods.includes("سبزیجات")}
              />{" "}
              سبزیجات
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="favoriteFoods"
                value="میوه"
                onChange={handleChange}
                checked={formData.favoriteFoods.includes("میوه")}
              />{" "}
              میوه
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="favoriteFoods"
                value="لبنیات"
                onChange={handleChange}
                checked={formData.favoriteFoods.includes("لبنیات")}
              />{" "}
              لبنیات
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="favoriteFoods"
                value="غذاهای سریع"
                onChange={handleChange}
                checked={formData.favoriteFoods.includes("غذاهای سریع")}
              />{" "}
              غذاهای سریع
            </label>
          </div>

          <div className="flex justify-between mt-4">
            <button className="btn" onClick={handleBack}>
              ⬅️ مرحله قبل
            </button>
            <button className="btn" onClick={handleNext}>
              مرحله بعدی ➡️
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-xl font-bold mb-6">سبک زندگی</h2>
          <select
            className="input"
            name="physicalActivity"
            value={formData.physicalActivity}
            onChange={handleChange}
          >
            <option value="">سطح فعالیت بدنی</option>
            <option value="کم">کم</option>
            <option value="متوسط">متوسط</option>
            <option value="زیاد">زیاد</option>
          </select>
          <select
            className="input"
            name="sleepHours"
            value={formData.sleepHours}
            onChange={handleChange}
          >
            <option value="">مدت زمان خواب (ساعت)</option>
            <option value="کمتر از ۵">کمتر از ۵</option>
            <option value="۵-۷">۵ تا ۷</option>
            <option value="۷-۹">۷ تا ۹</option>
            <option value="بیشتر از ۹">بیشتر از ۹</option>
          </select>
          <div className="flex justify-between mt-4">
            <button className="btn" onClick={handleBack}>
              ⬅️ مرحله قبل
            </button>
            <button className="btn" onClick={handleSubmit}>
              ارسال فرم ✅
            </button>
          </div>
        </>
      )}
    </div>
  );
}
