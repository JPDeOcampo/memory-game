import styles from "./SettingsDrawer.module.scss";
import type { Settings } from "@/@types/types";
import { SettingsIcon } from "lucide-react";
import Modal from "@/components/shared/Modal/Modal";

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
  onClose: () => void;
}

const DEFAULT: Settings = {
  hideMatched: false,
  hideTimer: false,
  hideMoves: false,
  numberedCards: false,
  sound: false,
};

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className={styles.toggle}>
      <button
        className={`${styles.toggleBtn} ${value ? styles.on : ""}`}
        onClick={() => onChange(true)}
        aria-pressed={value}
      >
        On
      </button>
      <button
        className={`${styles.toggleBtn} ${!value ? styles.on : ""}`}
        onClick={() => onChange(false)}
        aria-pressed={!value}
      >
        Off
      </button>
    </div>
  );
}

const SettingsDrawer = ({ settings, onChange, onClose }: Props) => {
  const set = <K extends keyof Settings>(key: K, val: Settings[K]) =>
    onChange({ ...settings, [key]: val });

  return (
    <Modal
      title={{
        icon: <SettingsIcon />,
        label: "Game Settings",
        subLabel: "Customize your game experience",
      }}
      onClose={onClose}
    >
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Display</div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Numbered Cards</span>
          <Toggle
            value={settings.numberedCards}
            onChange={(v) => set("numberedCards", v)}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Hide Matched Cards</span>
          <Toggle
            value={settings.hideMatched}
            onChange={(v) => set("hideMatched", v)}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Hide Timer</span>
          <Toggle
            value={settings.hideTimer}
            onChange={(v) => set("hideTimer", v)}
          />
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Hide Moves</span>
          <Toggle
            value={settings.hideMoves}
            onChange={(v) => set("hideMoves", v)}
          />
        </div>
      </div>

      <button className={styles.resetBtn} onClick={() => onChange(DEFAULT)}>
        Reset all settings to default
      </button>
    </Modal>
  );
};

export default SettingsDrawer;
