<template>
  <c-flex bg="#E5E5E5" w="100vw" h="100vh" justifyContent="center" alignItems="center">
    <c-stack bg="white" px="40px" py="120px" borderRadius="8px" border="1px solid #F0F0F0" justifyContent="center" alignItems="center">
      <c-stack w="550px" marginY="5" justifyContent="center" alignItems="center" v-if="!isVerifiedAt">
        <c-spinner thickness="4px" speed="0.65s" empty-color="green.200" color="vue.500" size="xl" />
      </c-stack>
      <c-stack w="750px" justifyContent="center" alignItems="center" v-else>
        <c-flex border="2px solid #07982F" borderRadius="full" w="64px" h="64px" justifyContent="center" alignItems="center">
          <c-icon name="check" size="32px" color="#07982F" />
          </c-flex>
        <c-stack marginY="5" justifyContent="center" alignItems="center">
          <c-text fontWeight="500" fontSize="20px" color="#000000">Your email address has been verified.</c-text>
          <c-box @click="$router.push({ name: 'Dashboard' })">
            <c-flex alignItems="center" color="#004CBD" cursor="pointer">
              <c-text color="#004CBD" fontWeight="500" fontSize="16px">Go to Dashboard</c-text>
              <c-icon name="chevron-right" size="32px" color="#004CBD" />
            </c-flex>
          </c-box>
        </c-stack>
      </c-stack>
    </c-stack>
  </c-flex>
</template>

<script lang="ts">
import axios from 'axios'
import { mapState, mapActions } from "redux-vuex"
import { Component, Vue } from 'vue-property-decorator'
import { required, email, minLength, between } from 'vuelidate/lib/validators'
import {fetchCurrentUser} from "../http/index.js"
import * as Actions from "../redux/actions"
import {
  CBox,
  CFlex,
  CStack,
  CLink,
  CIcon,
  CText,
  CSpinner
} from '@chakra-ui/vue'

@Component({
  components: {
    CBox,
    CFlex,
    CLink,
    CStack,
    CIcon,
    CText,
    CSpinner
  },
  data: mapState({
    isLoading: state => state.isLoading,
    isVerifiedAt: state => state.isVerifiedAt,
    verifyToken: state => state.verifyToken,
  }),
  methods: mapActions({
    async onVerifyAccount({ dispatch, getState }, verifyToken) {
      const state = await getState()
      await axios.post('/me/verify', {token: verifyToken}).then(({ data }) => {
        dispatch(Actions.verifyAccount(data.user))
        dispatch(Actions.isLoaded())
      })
    },
  }),
  mounted(){
    if(this.store.getState().isVerifiedAt){
      this.onVerifyAccount(this.$route.params.verifyToken)
    } else this.store.dispatch(Actions.isLoaded())
  },
})
export default class VerifyEmail extends Vue {}
</script>
