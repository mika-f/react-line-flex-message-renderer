export type ActionTypes =
  | PostbackProps
  | MessageProps
  | UriProps
  | DatetimePickerProps
  | CameraProps
  | CameraRollProps
  | LocationProps
  | RichmenuSwitchProps
  | ClipboardProps;

export interface PostbackProps {
  type?: "postback";
  label?: string;
  data?: string;
  displayText?: string;
  text?: string;
  inputOption?: "closeRichmenu" | "openRichmenu" | "openKeyboard" | "openVoice";
  fillInText?: string;
}

export interface MessageProps {
  type?: "message";
  label?: string;
  text?: string;
}

export interface UriProps {
  type?: "uri";
  label?: string;
  uri?: string;
  altUri?: {
    desktop: string;
  };
}

export interface DatetimePickerProps {
  type?: "datetimepicker";
  label?: string;
  data?: string;
  mode?: "date" | "time" | "datetime";
  initial?: string;
  max?: string;
  min?: string;
}

export interface CameraProps {
  type?: "camera";
  label?: string;
}

export interface CameraRollProps {
  type?: "cameraRoll";
  label?: string;
}

export interface LocationProps {
  type?: "location";
  label?: string;
}

export interface RichmenuSwitchProps {
  type?: "richmenuswitch";
  label?: string;
  richMenuAliasId?: string;
  data?: string;
}

export interface ClipboardProps {
  type?: "clipboard";
  label?: string;
  clipboardText?: string;
}

export type ActionCallback = (action: ActionTypes) => void;
