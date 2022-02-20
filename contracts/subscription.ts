
export interface StepperStep {
  id: string | number;
  title: string;
}

export enum SubscriptionStepRoutes {
  PersonalInfo = 'personal-info',
  Membership = 'membership',
  Overview = 'overview'
}

export enum SubscriptionStepTitles {
  PersonalInfo = 'Personal info',
  Membership = 'Membership',
  Overview = 'Overview'
}

export enum SubscriptionFormMembership {
  Regular = 'Regular',
  Premium = 'Premium'
}

export interface MembershipEntry {
  name: SubscriptionFormMembership;
  description: string;
}

export enum Phones { home, mobile, main, work, other }

export enum SubscriptionFormPhoneTypes {
  home = 'home',
  work = 'work',
  mobile = 'mobile',
  main = 'main',
  other = 'other'
}

export interface ListedPhone {
  text: string;
  value: string;
  disabled?: boolean
}

export interface PhoneOptions {
  mobile?: number | null;
  home?: number | null;
  work?: number | null;
  other?: number | null;
  main?: number | null;
}

export interface SubcriptionFormPhoneEntry {
  type: string;
  value: number | null;
}

export interface SubcriptionForm {
  firstName: string;
  lastName: string;
  email: string;
  phones: PhoneOptions;
  membership: SubscriptionFormMembership;
}

export class SubcriptionFormEntity implements SubcriptionForm {
  constructor (
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public phones: PhoneOptions = {
      work: null,
      home: null
    },
    public membership: SubscriptionFormMembership = SubscriptionFormMembership.Regular
  ) {}
}

export enum SubscrptionFormLabels {
  firstName = 'First name',
  lastName = 'Last name',
  email = 'E-mail',
  phone = 'Phone',
  membership = 'Membership'
}

export enum SubscrptionFormNames {
  firstName = 'firstName',
  lastName = 'lastName',
  email = 'email',
  phone = 'phone',
  membership = 'membership'
}
