import React from "react";
import styles from "./SharjahPlate.module.css";

interface SharjahPlateProps {
  plateNumber: string;
  enterNumber: string;
}

const SharjahPlate: React.FC<SharjahPlateProps> = ({
  plateNumber,
  enterNumber,
}) => {
  return (
    <div className={styles.plateContainer}>
      <div className={styles.plateContent}>
        {/* Left side - UAE vertical text */}
        <div className={styles.uaeText}>
          <span>U</span>
          <span>A</span>
          <span>E</span>
        </div>

        {/* Enter Number */}
        <div className={styles.enterNumber}>{enterNumber}</div>

        {/* Middle section - Arabic and English text */}
        <div className={styles.middleSection}>
          <div className={styles.arabicText}>الشارقة</div>
          <div className={styles.sharjahText}>SHARJAH</div>
        </div>

        {/* Right side - Plate number */}
        <div className={styles.rightSection}>
          <div className={styles.plateNumber}>{plateNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default SharjahPlate;
