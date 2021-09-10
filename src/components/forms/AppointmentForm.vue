<template>
  <form
    v-if="!form_success"
    class="form appointment-form"
    @submit.prevent="submit"
  >
    <div>
      <h1>Форма создания клиента</h1>
      <app-text-field
        v-model="profile.last_name"
        name="Фамилия"
        :v="$v.profile.last_name"
      />
      <app-text-field
        v-model="profile.name"
        name="Имя"
        :v="$v.profile.name"
      />
      <app-text-field
        v-model="profile.patronymic"
        name="Отчество"
      />
      <app-date
        v-model="profile.birthday"
        name="Дата рождения"
        :v="$v.profile.birthday"
      />
      <app-tel
        v-model="profile.tel"
        name="Номер телефона"
        :v="$v.profile.tel"
      />
      <app-radio
        v-model="profile.gender"
        name="Пол"
        :options="form_options.gender"
      />
      <app-multi-select
        v-model="profile.clients_group"
        name="Группа клиентов"
        :options="form_options.clients_group"
        :v="$v.profile.clients_group"
      />
      <app-select
        v-model="profile.doctor"
        name="Лечащий врач"
        :options="form_options.doctors"
      />
      <app-check-box
        v-model="profile.prevent_sms"
        name="Не отправлять СМС"
        true_val="Не отправлять"
        :v="$v.profile.prevent_sms"
      />
      <fieldset class="address">
        <legend>Адрес:</legend>
        <div>
          <app-number-field
            v-model="profile.address.index"
            name="Индекс"
            :v="$v.profile.address.index"
          />
          <app-text-field
            v-model="profile.address.country"
            name="Страна"
          />
          <app-text-field
            v-model="profile.address.region"
            name="Область"
          />
          <app-text-field
            v-model="profile.address.city"
            name="Город"
            :v="$v.profile.address.city"
          />
          <app-text-field
            v-model="profile.address.street"
            name="Улица"
          />
          <app-text-field
            v-model="profile.address.house"
            name="Дом"
          />
        </div>
      </fieldset>
      <fieldset class="doc">
        <legend>Документ:</legend>
        <div>
          <app-select
            v-model="profile.doc.type"
            name="Тип документа"
            :v="$v.profile.doc.type"
            :options="form_options.doc_type"
          />
          <app-number-field
            v-model="profile.doc.series"
            name="Серия"
            :v="$v.profile.doc.series"
          />
          <app-number-field
            v-model="profile.doc.number"
            name="Номер"
            :v="$v.profile.doc.number"
          />
          <app-text-field
            v-model="profile.doc.issued_by"
            name="Кем выдан"
          />
          <app-date
            v-model="profile.doc.date_document"
            name="Дата выдачи"
            :v="$v.profile.doc.date_document"
          />
        </div>
      </fieldset>
      <div class="form__group">
        <button class="btn btn_submit">Отправить</button>
      </div>
    </div>
  </form>
  <div
    v-else
    class="message message_success"
  >
    Клиент: {{ profile.name }} {{ profile.last_name }} <br>
    успешно создан
  </div>
</template>

<script>
import { alpha, numeric, required } from 'vuelidate/lib/validators';
import { equality, startStr } from '@/validate/validators';
import AppTextField           from '@/components/inputs/TextField';
import AppNumberField         from '@/components/inputs/NumberField';
import AppDate                from '@/components/inputs/Date';
import AppSelect              from '@/components/inputs/Select';
import AppMultiSelect         from '@/components/inputs/MultiSelect';
import AppTel                 from '@/components/inputs/Tel';
import AppCheckBox            from '@/components/inputs/CheckBox';
import AppRadio               from '@/components/inputs/Radio';

export default {
  name: 'AppointmentForm',
  components: {
    AppTextField,
    AppNumberField,
    AppDate,
    AppTel,
    AppMultiSelect,
    AppSelect,
    AppCheckBox,
    AppRadio,
  },
  data() {
    return {
      profile: {
        last_name: null,
        name: null,
        patronymic: null,
        birthday: null,
        tel: null,
        gender: null,
        clients_group: [],
        doctor: null,
        prevent_sms: null,
        address: {
          index: null,
          country: null,
          region: null,
          city: null,
          street: null,
          house: null,
        },
        doc: {
          type: null,
          series: null,
          number: null,
          issued_by: null,
          date_document: null,
        },
      },
      /**
       * Добавил отдельно опции, чтоб сильно не раздувать сам шаблон html,
       * а так в нормальных условиях все данные по форме могут приходить с сервера.
       * так что надо смотреть по обстоятельствам
       * */
      form_options: {
        gender: {
          m: 'Мужской',
          f: 'Женский',
        },
        clients_group: {
          vip: 'VIP',
          problems: 'Проблемные',
          oms: 'ОМС',
        },
        doctors: {
          45: 'Иванов',
          49: 'Захаров',
          71: 'Чернышева',
        },
        doc_type: {
          passport: 'Паспорт',
          birth_certificate: 'Свидетельство о рождении',
          driver_license: 'Вод. удостоверение',
        },
      },

      form_success: false,
    };
  },
  methods: {
    submit() {
      this.$v.profile.$touch();
      if ( !this.$v.profile.$error) {
        console.log(this.profile);

        if (this.$v.profile.$dirty) {
          this.form_success = true;
        }
      }
    },
  },
  validations: {
    profile: {
      last_name: {
        required,
      },
      name: { required },
      patronymic: { alpha },
      birthday: { required },
      tel: {
        required,
        equality: equality(11),
        numeric,
        startStr: startStr(7),
      },
      clients_group: { required },
      address: {
        index: { numeric },
        city: {
          required,
        },
      },
      doc: {
        type: { required },
        series: { numeric },
        number: { numeric },
        date_document: { required },
      },
    },
  },
};
</script>

<style lang="scss" scoped>

.form {
  &::v-deep &__group_radio {
    margin-left: auto;
    margin-right: auto;
    max-width: 300px;
  }

  &::v-deep &__group-content {
    display: flex;

    > * {
      width: 50%;
    }
  }

  @media (min-width: 412px) {

    .address {

      > div {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;

        > * {
          width: 50%;
          padding: 0 5px;
        }
      }
    }
  }
}

.appointment-form {
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
}

.message {
  &_success {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
}

@media (min-width: 568px) {

  .appointment-form {
    padding: 30px;
  }

  h1 {
    font-size: 26px;
  }
}

</style>
