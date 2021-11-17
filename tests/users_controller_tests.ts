import { suite, test } from '@testdeck/mocha';
import { mock, instance, when } from 'ts-mockito';
import express from 'express';
import users_controller from '../backend/controllers/users_controller'
import { fail } from 'assert';

@suite class UsersControllerTests {

    private exprReq: express.Request;
    private exprRes: express.Response

    before() {
       this.exprReq = mock(express.request)
       this.exprRes = mock(express.response)
    }

    @test 'create new user success'() {
        users_controller.create_new_user(this.exprReq,this.exprRes)
    }

}