import { UAParser } from 'ua-parser-js';

export type Browser =
    | 'Amaya'
    | 'Android Browser'
    | 'Arora'
    | 'Avant'
    | 'Baidu'
    | 'Blazer'
    | 'Bolt'
    | 'Camino'
    | 'Chimera'
    | 'Chrome'
    | 'Chromium'
    | 'Comodo Dragon'
    | 'Conkeror'
    | 'Dillo'
    | 'Dolphin'
    | 'Doris'
    | 'Edge'
    | 'Epiphany'
    | 'Fennec'
    | 'Firebird'
    | 'Firefox'
    | 'Flock'
    | 'GoBrowser'
    | 'iCab'
    | 'ICE Browser'
    | 'IceApe'
    | 'IceCat'
    | 'IceDragon'
    | 'Iceweasel'
    | 'IE [Mobile]'
    | 'Iron'
    | 'Jasmine'
    | 'K-Meleon'
    | 'Konqueror'
    | 'Kindle'
    | 'Links'
    | 'Lunascape'
    | 'Lynx'
    | 'Maemo'
    | 'Maxthon'
    | 'Midori'
    | 'Minimo'
    | 'MIUI Browser'
    | '[Mobile] Safari'
    | 'Mosaic'
    | 'Mozilla'
    | 'Netfront'
    | 'Netscape'
    | 'NetSurf'
    | 'Nokia'
    | 'OmniWeb'
    | 'Opera [Mini/Mobi/Tablet]'
    | 'Phoenix'
    | 'Polaris'
    | 'QQBrowser'
    | 'RockMelt'
    | 'Silk'
    | 'Skyfire'
    | 'SeaMonkey'
    | 'SlimBrowser'
    | 'Swiftfox'
    | 'Tizen'
    | 'UCBrowser'
    | 'Vivaldi'
    | 'w3m'
    | 'Yandex'
    | 'Unknown';

export type OS = 'iOS' | 'Android' | 'Unknown';

export const getBrowser = (userAgent?: string | null): Browser => {
    try {
        return new UAParser(userAgent ?? window.navigator.userAgent).getBrowser().name as Browser;
    } catch {
        return 'Unknown';
    }
};

export const getOS = (userAgent?: string | null): OS => {
    try {
        return new UAParser(userAgent ?? window.navigator.userAgent).getOS().name as OS;
    } catch {
        return 'Unknown';
    }
};
