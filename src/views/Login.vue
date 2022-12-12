<template>
  <c-flex bg="#E5E5E5" w="100vw" h="100vh" justifyContent="center" alignItems="center">
    <c-stack w="750px" bg="white" px="40px" py="24px" borderRadius="8px" border="1px solid #F0F0F0">
      <c-stack alignSelf="center" justifyContent="center" alignItems="center">
        <c-heading fontSize="24px" fontWeight="600" color="#000000">Log in</c-heading>
        <c-flex gap="2">
          <c-heading fontSize="16px" fontWeight="400" color="#777777">If you have no account,</c-heading>
          <c-link fontSize="16px" fontWeight="400" color="#004CBD" @click="$router.push({ name: 'Register' })">
            Sign up
          </c-link>
        </c-flex>
      </c-stack>
      <c-stack>
        <c-form-control>
          <c-form-label for="email">Email address</c-form-label>
          <c-input
            v-model.trim="$v.email.$model"
            type="email"
            id="email"
            placeholder="Type your email address here"
            aria-describedby="lname-helper-text"
          />
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
        </c-form-control>
        <c-box marginBottom="5px" marginTop="20px" w="100%">
          <c-button
            w="100%"
            color="white"
            borderRadius="4px"
             @click="onSubmit"
            :bg="(this.$v.$invalid) ? '#B7BCC4' : '#555658'"
          >
            Log In
          </c-button>
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
    formData: state => state.formData,
    isLoading: state => state.isLoading,
    email: state => state.formData.email,
    password: state => state.formData.password,
  }),
  methods: mapActions({
    onShow: ({ dispatch }) => {
      dispatch(Actions.togglePassword());
    },
    onSubmit({ dispatch }) {
      if(this.$v.$invalid) return null
      axios.post('/tokens', {
        email: this.$v.email.$model,
        password: this.$v.password.$model
      }).then(({ data }) => {
        this.$toast({
          title: 'LoggedIn Successfully!',
          description: data.message,
          status: 'success',
          duration: 3000
        })
        dispatch(Actions.login({
          authToken: data.token,
          currentUser: data.user
        }))
        this.$router.push({ name: 'Dashboard' })
      }).catch((error) => {
        this.$toast({
          title: 'Login Failed!',
          description: 'Login failed at this time. Please try again',
          status: 'error',
          duration: 3000
        })
      })
    },
  }),
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(8)},
  }
})
export default class Login extends Vue {}
</script>
