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
            },
            {
                id       : 'e-commerce',
                title    : 'E-Commerce',
                translate: 'NAV.ECOMMERCE',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [
                    {
                        id        : 'orders',
                        title     : 'Orders',
                        type      : 'item',
                        url       : '/e-commerce/orders',
                        exactMatch: true
                    },
                    {
                        id        : 'products',
                        title     : 'Products',
                        type      : 'item',
                        url       : '/e-commerce/products',
                        exactMatch: true
                    },
                ]
            },
        ]
    }
];
