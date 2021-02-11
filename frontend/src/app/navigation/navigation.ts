import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'configuration',
                title    : 'Configuration',
                translate: 'NAV.CONFIGURATION.TITLE',
                type     : 'item',
                icon     : 'setting',
                url      : '/configuration',
            }
        ]
    }
];
