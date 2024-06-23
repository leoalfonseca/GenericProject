export type BDOProps = {
  id: string;
  title: string;
  dateInitial: Date;
  start: string;
  dateEnd: Date;
  end: string;
  color: string;
  userId: string;
  description: string;
  allDay: boolean;
  priority: boolean;
  isActive: boolean;
};

export interface iBdoEventList {
  id: string;
  title: string;
  color: string;
  start: Date;
  end: Date;
  dateInitial: Date;
  dateEnd: boolean;
  priority: boolean;
  allDay: boolean;
  description: string;
  isActive?: boolean;
}

export interface iBdoEvent {
  title: string;
  dateInitial: any;
  dateEnd: any;
  color: string;
  description: string;
  priority: boolean;
  userId: string;
}

export interface iBdoEventUpdate {
  title?: string;
  dateInitial?: Date | string;

  start?: Date | string;
  end?: Date | string;

  dateEnd?: Date | string;
  color?: string;
  description?: string;
  priority?: boolean;
  userId?: string;
}
