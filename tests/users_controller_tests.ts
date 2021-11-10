import { suite, test } from '@testdeck/mocha';
import { mock, instance, when } from 'ts-mockito';
import express from 'express';
import users_controller from '../backend/controllers/users_controller'
import { fail } from 'assert';

@suite class UsersControllerTests {

    private exprReq: express.Request;

    before() {
       this.exprReq = mock(express.request)
    }

    @test 'create new user success'() {
        fail()
    }

}