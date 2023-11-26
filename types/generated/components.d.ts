import type { Schema, Attribute } from '@strapi/strapi';

export interface DayWorkingHour extends Schema.Component {
  collectionName: 'components_day_working_hours';
  info: {
    displayName: 'Working Hour';
    icon: 'phone';
  };
  attributes: {
    Hour: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'day.working-hour': DayWorkingHour;
    }
  }
}
