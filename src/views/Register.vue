<template>
  <c-flex bg="#E5E5E5" w="100vw" h="100vh" justifyContent="center" alignItems="center">
    <c-stack w="750px" bg="white" px="40px" py="24px" borderRadius="8px" border="1px solid #F0F0F0">
      <c-stack alignSelf="center">
        <c-heading fontSize="24px" fontWeight="600" color="#000000">Create an Account</c-heading>
        <c-flex gap="2">
          <c-heading fontSize="16px" fontWeight="400" color="#777777">Already have an account?</c-heading>
          <c-link fontSize="16px" fontWeight="400" color="#004CBD" @click="$router.push({ name: 'Login' })">
            Log in
          </c-link>
        </c-flex>
      </c-stack>
      <c-stack>
        <c-flex gap="3" justifyContent="space-between">
          <c-form-control w="100%">
            <c-form-label for="fname">First Name</c-form-label>
            <c-input v-model.trim="$v.fname.$model" type="text" id="fname" placeholder="Type here" aria-describedby="fname-helper-text" />
          </c-form-control>
          <c-form-control w="100%">
            <c-form-label for="last-name">Last Name</c-form-label>
            <c-input v-model.trim="$v.lname.$model" type="text" id="last-name" placeholder="Type here" aria-describedby="lname-helper-text" />
          </c-form-control>
        </c-flex>
        <c-form-control>
          <c-form-label for="email">Email address</c-form-label>
          <c-input v-model.trim="$v.email.$model" type="email" id="email" placeholder="Type your email address here" aria-describedby="lname-helper-text" />
          <c-form-helper-text color="#F41E10" id="fname-helper-text" v-if="!$v.email.email">
            Wrong email format!
          </c-form-helper-text>
        </c-form-control>
        <c-form-control>
          <c-form-label for="password">Password</c-form-label>
          <c-input-group size="md">
            <c-input
              pr="4.5rem"
              :type="isShow ? 'text' : 'password'"
              placeholder="Enter password"
              v-model="password"
            />
            <c-input-right-element width="4.5rem">
             <c-box  @click="onShow">
                <c-icon-button aria-label="show password" bg="transparent" icon="eye" v-if="!isShow" />
                <c-icon-button aria-label="show password" bg="transparent" icon="eye-slash" v-else />
              </c-box>
            </c-input-right-element>
          </c-input-group>
          <c-form-helper-text fontSize="12px" id="fname-helper-text" v-if="password && password.length">
            <c-list spacing="3">
              <c-list-item :color="$v.password.containsUppercase ? '#07982F' : '#999B9F'">
                <c-list-icon :icon="$v.password.containsUppercase ? 'circle' : 'circle-notch'" size="2" />
                Contains at least one uppercase letter
              </c-list-item>
              <c-list-item :color="$v.password.containsEightChars ? '#07982F' : '#999B9F'">
                <c-list-icon :icon="$v.password.containsEightChars ? 'circle' : 'circle-notch'" size="2" />
                 Contains eight characters
              </c-list-item>
              <c-list-item :color="$v.password.containsNumber ? '#07982F' : '#999B9F'">
                <c-list-icon :icon="$v.password.containsNumber ? 'circle' : 'circle-notch'" size="2" />
                Contains at least one number
              </c-list-item>
              <c-list-item :color="$v.password.containsSpecial ? '#07982F' : '#999B9F'">
                <c-list-icon :icon="$v.password.containsSpecial ? 'circle' : 'circle-notch'" size="2" />
                Contains at least one symbol
              </c-list-item>
            </c-list>
          </c-form-helper-text>
        </c-form-control>
        <c-box marginBottom="5px" marginTop="20px" w="100%">
          <c-box marginBottom="5px" marginTop="20px" w="100%">
            <c-button
              w="100%"
              color="white"
              borderRadius="4px"
              @click="onSubmit"
              :bg="(this.$v.$invalid) ? '#B7BCC4' : '#555658'"
            >
              Sign Up
            </c-button>
          </c-box>
        </c-box>
      </c-stack>
    </c-stack>
  </c-flex>
</template>

<script lang="ts">
import axios from 'axios'
import { mapState, mapActions } from "redux-vuex"
import { Component, Vue } from 'vue-property-decorator'
import { required, email, minLength, between } from 'vuelidate/lib/validators'
import * as Actions from "../redux/actions"
import {
  CBox,
  CFlex,
  CStack,
  CHeading,
  CLink,
  CInput,
  CFormControl,
  CFormLabel,
  CFormErrorMessage,
  CFormHelperText,
  CInputGroup,
  CInputRightElement,
  CButton,
  CList,
  CListItem,
  CListIcon,
  CIconButton
} from '@chakra-ui/vue'

@Component({
  components: {
    CBox,
    CFlex,
    CLink,
    CStack,
    CInput,
    CHeading,
    CFormControl,
    CFormLabel,
    CFormErrorMessage,
    CFormHelperText,
    CInputGroup,
    CInputRightElement,
    CButton,
    CList,
    CListItem,
    CListIcon,
    CIconButton
  },
  data: mapState({
    isShow: state => state.isShow,
    fname: state => state.formData.fname,
    lname: state => state.formData.lname,
    email: state => state.formData.email,
    password: state => state.formData.password,
  }),
  methods: mapActions({
    onShow: ({ dispatch }) => {
      dispatch(Actions.togglePassword());
    },
    onSubmit({ dispatch }) {
      if(this.$v.$invalid) return null
      axios.post('/me', {
        email: this.$v.email.$model,
        first_name: this.$v.fname.$model,
        last_name: this.$v.lname.$model,
        password: this.$v.password.$model
      }).then(({ data }) => {
        this.$toast({
          title: 'Account created!',
          description: data.message,
          status: 'success',
          duration: 3000
        })
        dispatch(Actions.register({
          authToken: data.token,
          currentUser: data.user
        }))
        this.$router.push({ name: 'Dashboard' })
      }).catch((error) => {
        this.$toast({
          title: 'Something went wrong!',
          description: 'Account creation has failed. Please try again',
          status: 'error',
          duration: 30000
        })
      })
    },
  }),
  validations: {
    fname: { required, minLength: minLength(4) },
    lname: { required, minLength: minLength(4) },
    email: { required, email },
    password: {
      required,
      containsEightChars: function(value) {
        return value.length >= 8 && value.length != 0
      },
      containsUppercase: function(value) {
        return /[A-Z]/.test(value)
      },
      containsLowercase: function(value) {
        return /[a-z]/.test(value)
      },
      containsNumber: function(value) {
        return /[0-9]/.test(value)
      },
      containsSpecial: function(value) {
        return /[#?!@$%^&*-]/.test(value)
      }
    }
  }
})
export default class Register extends Vue {}
</script>
