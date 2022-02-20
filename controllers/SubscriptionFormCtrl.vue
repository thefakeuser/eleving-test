<script lang="ts">
import Vue, { PropOptions, VNode, CreateElement } from 'vue'

import {
  ListedPhone,
  MembershipEntry,
  SubcriptionForm,
  SubcriptionFormEntity,
  SubscriptionFormPhoneTypes,
  SubscriptionFormMembership,
  Phones,
  PhoneOptions
} from '@/contracts/subscription'
import { OptionTextValue } from '@/contracts/design-system'

export default Vue.extend({
  props: {
    data: {
      type: Object,
      default: () => new SubcriptionFormEntity()
    } as PropOptions<SubcriptionForm>
  },

  data () {
    return {
      membershipPlans: [
        {
          name: SubscriptionFormMembership.Regular,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nunc nulla, ullamcorper in justo ut, pharetra gravida nibh. Aliquam ullamcorper est quis sagittis vehicula. Sed elementum lobortis gravida. Curabitur lectus nibh, congue ut vulputate scelerisque, viverra sed elit. Duis ultrices a quam eu convallis.'
        },
        {
          name: SubscriptionFormMembership.Premium,
          description: 'Nulla non ex tristique, bibendum erat vitae, ullamcorper metus. Suspendisse erat ligula, rutrum quis imperdiet nec, accumsan eu metus. Aenean lacinia accumsan diam. Pellentesque leo tellus, condimentum tempor odio in, vestibulum lobortis orci. Nunc tincidunt dignissim auctor.'
        }
      ] as Array<MembershipEntry>,
      formState: JSON.parse(JSON.stringify(this.data))
    }
  },

  computed: {
    activePlanDescription (): string {
      const { description }: { description: string } = this.membershipPlans
        .find((plan: MembershipEntry) => plan.name === this.formState.membership) || { description: '' }

      return description
    },

    availablePhonesToAdd (): Array<string> {
      const existingPhones = Object.keys(this.formState.phones || {})

      return Object.values(SubscriptionFormPhoneTypes)
        .filter((phone: string) => !existingPhones.includes(phone))
    },

    phoneOptions (): Array<ListedPhone> {
      return Object.keys(SubscriptionFormPhoneTypes)
        .map((value: string) => ({
          value,
          text: value.charAt(0).toUpperCase() + value.slice(1),
          disabled: !this.availablePhonesToAdd.includes(value.toLowerCase())
        }))
    },

    flattenedFormData (): any {
      const flattObject = (object: any) => Object.keys(object || {})
        .reduce((acc: any, key: string) => {
          typeof object[key] === 'object'
            ? acc = { ...acc, ...flattObject(object[key]) }
            : acc[key] = object[key]
          return acc
        }, {})

      return flattObject(this.formState)
    }
  },

  methods: {
    addPhone (): void {
      const [firstAvailable]: string[] = this.availablePhonesToAdd
      this.formState.phones = { ...this.formState.phones, [firstAvailable]: null }
    },

    deletePhone (type: string): void {
      const clonedPhones: PhoneOptions = Object.assign({}, this.formState.phones)
      delete clonedPhones[type as keyof typeof Phones]

      this.formState.phones = clonedPhones
    },

    setMembership (membership: SubscriptionFormMembership): void {
      this.formState.membership = membership
    },

    getPhoneValue (type: SubscriptionFormPhoneTypes): OptionTextValue {
      return {
        value: this.formState.phones[type],
        option: {
          text: type,
          value: type
        }
      }
    },

    updatePhone (data: OptionTextValue, type: string): void {
      const phoneTypeToUpdate = data.option.value as keyof typeof Phones

      if (phoneTypeToUpdate !== type) {
        delete this.formState.phones[type]
      }

      this.formState.phones = { ...this.formState.phones, [phoneTypeToUpdate]: data.value }
    },

    submit (): void {
      this.$emit('submit', this.formState)
    }
  },

  render (h: CreateElement): VNode {
    return h('div', this.$scopedSlots.default!({
      addPhone: this.addPhone,
      activePlanDescription: this.activePlanDescription,
      availablePhonesToAdd: this.availablePhonesToAdd,
      deletePhone: this.deletePhone,
      formState: this.formState,
      flattenedFormData: this.flattenedFormData,
      getPhoneValue: this.getPhoneValue,
      membershipPlans: this.membershipPlans,
      setMembership: this.setMembership,
      submit: this.submit,
      updatePhone: this.updatePhone,
      phoneOptions: this.phoneOptions
    }))
  }
})
</script>
