import { InvalidSourceError } from "./exceptions";

/**
 * Formats a number with a specified number of decimal places.
 *
 * @param num - The number to format.
 * @param digits - number of decimal places to include.
 * @returns The formatted number.
 */
export function nFormatter(num: number, digits = 1) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

/**
 * Checks if the user is on mobile
 */
export function isMobile() {
  // below is to detect the type of device
  // const regex =
  //   /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  // return regex.test(navigator.userAgent);
  return window.matchMedia("(max-width: 1024px)").matches;
}

/**
 * Closes the drawer on screen size
 * @param stateToggler - function to toggle the state
 */
export function closeOnScreenSize(stateToggler: () => void) {
  const listener = () => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      stateToggler();
    }
  };
  window.addEventListener("resize", listener);

  return () => {
    window.removeEventListener("resize", listener);
  };
}

/**
 * Checks the user preferences (rememberMe) and returns the appropriate token expiration date.
 * @param rememberMe - boolean
 * @returns the expiration date
 */
export function generateTokenExp(rememberMe: boolean) {
  const SESSION_DURATION = {
    short: 60 * 60 * 1000,
    long: 30 * 24 * 60 * 60 * 1000,
    // short: 15 * 1000,
    // long: 30 * 1000,
    logout: 0,
  } as const;

  const span = rememberMe ? SESSION_DURATION.long : SESSION_DURATION.short;
  let expires = new Date(Date.now() + span);
  return expires;
}

/**
 * @desc  Basic string operations on url protocol.
 */
export namespace UrlProtocolUtils {
  const hasProtocol = new RegExp(/^(http|https|ws|wss):\/\//);

  /**
   * Converts a URL from HTTPS to HTTP or WSS to WS.
   * @param {string} url - The input URL string.
   * @return {string} The converted URL string.
   */
  export function toHTTP(url: string): string {
    if (hasProtocol.test(url)) {
      return url.replace("wss://", "https://").replace("ws://", "http://");
    }
    return "https://" + url;
  }

  /**
   * Converts a URL from HTTP to WSS or HTTPS to WS.
   * @param {string} url - The input URL string.
   * @return {string} The converted URL string.
   */
  export function toWS(url: string): string {
    if (hasProtocol.test(url)) {
      return url.replace("https://", "wss://").replace("http://", "ws://");
    }
    return "wss://" + url;
  }

  /**
   * Removes the protocol (HTTP, HTTPS, WS, WSS) from a URL.
   * @param {string} url - The input URL string.
   * @return {string} The converted URL string without the protocol.
   */
  export function removeProtocol(url: string): string {
    return url
      .replace("ws://", "")
      .replace("wss://", "")
      .replace("http://", "")
      .replace("https://", "");
  }
}
